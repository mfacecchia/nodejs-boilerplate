import argon2 from 'argon2';
import { InvalidCredentialsError } from '../errors/custom.errors.js';
import { handleError } from '../errors/errorHandler.errors.js';
import { hashPassword } from '../security/hashing.security.js';
import { createUserWithCredentials } from '../../db/queries/mysql/user.mysql.query.js';
import isLoggedIn from '../middlewares/isLoggedIn.middleware.js';
import { findUser } from '../../db/queries/mysql/user.mysql.query.js';
import { generateJWT } from '../auth/jwt.auth.js';
import { generateCsrf } from '../security/csrf.security.js';
import { defaultCookieOptions } from '../utils/constants.utility.js';
import { clearAllCookies } from '../utils/cookies.utility.js';
import { validateLogin, validateSignup } from '../validation/auth.validator.js';
import { codeVerificationRateLimit, loginRateLimit, newCodeGenerationRateLimit, signupRateLimit } from '../utils/rateLimiters.utility.js';
import { verifyEmail } from '../../db/queries/mysql/emailVerification.mysql.query.js';
import { getKeyValue, removeKeyValue } from '../../db/queries/redis/keyValueManagement.redis.query.js';
import sendEmailVerificationEmail from '../mail/emailVerification.mail.js';
import isCsrfTokenValid from '../middlewares/isCsrfTokenValid.middleware.js';
import isEmailVerified from '../middlewares/isEmailVerified.middleware.js';
import sendPasswordResetEmail from '../mail/passwordReset.mail.js';


export default function userAuth(app){
    app.post('/user/login/credentials', isLoggedIn({ strict: false, returnLastUserValues: false, sendResponseOnValidToken: true }), validateLogin(), loginRateLimit, async (req, res) => {
        try{
            const userData = await findUser(req.body.email, { isID: false, throwOnFound: false, getFullInfo: true });
            const passwordMatches = await argon2.verify(userData.credential[0].password, req.body.password);
            if(!passwordMatches) throw new InvalidCredentialsError('Invalid email/password combination.');
            const jsonWebToken = await generateJWT({}, userData.userID, { rememberMe: Boolean(req.body.rememberMe), storeToken: true });
            const csrfToken = await generateCsrf({ storeToken: true });
            res.cookie('csrf', csrfToken.token, defaultCookieOptions);
            res.cookie('userSession', jsonWebToken, defaultCookieOptions);
            return res.status(200).json({
                status: 200,
                message: "Logged in successfully.",
                verified: userData.credential[0].verified
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });
    
    app.post('/user/signup/credentials', isLoggedIn({ strict: false, returnLastUserValues: false, sendResponseOnValidToken: true }), validateSignup(), signupRateLimit, async (req, res) => {
        try{
            const { firstName, lastName, email, password } = req.body;
            const hashedPassword = await hashPassword(password);
            await createUserWithCredentials(firstName, lastName, email, hashedPassword);
            return res.status(201).json({
                status: 201,
                message: "User created successfully."
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });
    
    app.post('/user/logout', isLoggedIn({ strict: true, returnLastUserValues: false, sendResponseOnValidToken: false }), async (req, res) => {
        try{
            await clearAllCookies(req, res);
            return res.status(200).json({
                status: 200,
                message: "Logged out successfully."
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });

    // TODO: Add `isCodeValid` mw
    app.post('/user/verify', codeVerificationRateLimit, async (req, res) => {
        try{
            const redisKeyName = 'emailVerification'
            const { verificationCode } = req.body;
            const userID = await getKeyValue(redisKeyName, verificationCode);
            await Promise.all([
                verifyEmail(userID),
                removeKeyValue(redisKeyName, verificationCode)
            ]);
            return res.status(200).json({
                status: 200,
                message: "Email successfully verified."
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });
    
    app.post('/user/verify/generate', isLoggedIn({ strict: true, sendResponseOnValidToken: false, returnLastUserValues: true }), isCsrfTokenValid(), isEmailVerified({ strict: false, sendResponseOnVerifiedEmail: true }), newCodeGenerationRateLimit, async (req, res) => {
        try{
            const { userID, firstName, lastName } = req.lastUserValues;
            const { email } = req.lastUserValues.credential[0];
            await sendEmailVerificationEmail(userID, email, firstName, lastName);
            return res.status(200).json({
                status: 200,
                message: "Verification code sent. Check your inbox or the spam folder."
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });
    
    app.post('/user/reset/generate', newCodeGenerationRateLimit, async (req, res) => {
        try{
            const { email } = req.body;
            const userData = await findUser(email, { isID: false, throwOnFound: false, getFullInfo: false });
            const { firstName, lastName, userID } = userData;
            await sendPasswordResetEmail(userID, email, firstName, lastName);
            return res.status(200).json({
                status: 200,
                message: "Reset code sent."
            });
        }catch(err){
            return await handleError(req, res, err);
        }
    });
}