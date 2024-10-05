import { validateJWT } from "../auth/jwt.auth.js";
import { getKeyValue, removeKeyValue } from "../../db/queries/redis/keyValueManagement.redis.query.js";
import { findUser } from "../../db/queries/mysql/user.mysql.query.js";
import { TokenValidationError } from "../errors/custom.errors.js";
import { handleError, logError } from "../errors/errorHandler.errors.js";
import 'dotenv/config';


/**
 * Checks if the user is already logged in by validating the JWT passed in the request header (parsed by cookie-parser in `req.cookies`).
 * Sends a response in case the JWT is invalid or missing (if `strict` is set to `true`)
 * or if the user is logged in and `sendResponseOnValidToken` is set to `true`, otherwise calls `next()`
 * The `strict` parameter can be set to `true` in case you want to send 401 status code if the token does not exist as well
 * The `returnLastUserValues` is used to set the values obtained from the `findUser()` function in a specific `req.lastUserValues` Object
 * @param {object} options
 * @throws Custom `TokenValidationError` if the JWT is invalid or missing (if the `strict` option is set to `true`)
 */
export default function isLoggedIn({ strict = true, sendResponseOnValidToken = false, returnLastUserValues = false } = {}){
    return async (req, res, next) => {
        try{
            const redisKeyName = 'JWT';
            const jsonWebToken = req.cookies.userSession;
            if(strict && !jsonWebToken) throw new TokenValidationError('Authorization token not found. Please Log-in again.');
            if(!jsonWebToken) return next();
            const decodedToken = await validateJWT(jsonWebToken, process.env.JWT_SECRET);
            const userID = await getKeyValue(redisKeyName, jsonWebToken);
            const userData = await findUser(userID, { getFullInfo: true });
            // Invalid token so needs to be removed
            if(userData.updatedAt > decodedToken.iat){
                await removeKeyValue(redisKeyName, jsonWebToken);
                throw new TokenValidationError('Invalid authorization token.');
            }
            if(sendResponseOnValidToken){
                return res.status(200).json({
                    status: 200,
                    message: "Logged in successfully.",
                    verified: userData.credential[0].verified
                });
            }
            if(returnLastUserValues) req.lastUserValues = userData;
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
        return next();
    }
}