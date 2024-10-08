import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isCsrfTokenValid from "../middlewares/isCsrfTokenValid.middleware.js";
import { handleError } from "../errors/errorHandler.errors.js";
import { clearAllCookies } from "../utils/cookies.utility.js";
import { deleteUser, updateUser } from "../../db/queries/mysql/user.mysql.query.js";
import { hashPassword } from "../security/hashing.security.js";
import { validateUserUpdate } from "../validation/user.validator.js";
import { userDeleteRateLimit, userUpdateRateLimit } from "../utils/rateLimiters.utility.js";


export default function userManagement(app){
    app.route('/api/user')
        .get(isLoggedIn({ strict: true, sendResponseOnValidToken: false, returnLastUserValues: true }), async (req, res) => {
            try{
                const { firstName, lastName } = req.lastUserValues;
                const { email, verified } = req.lastUserValues.credential[0];
                const userData = { firstName, lastName, email, verified };
                return res.status(200).json({
                    status: 200,
                    message: "User found",
                    user: userData
                });
            }catch(err){
                return await handleError(req, res, err);
            }
        })
        .put(isLoggedIn({ strict: true, sendResponseOnValidToken: false, returnLastUserValues: true }), isCsrfTokenValid(), validateUserUpdate(), userUpdateRateLimit, async (req, res) => {
            try{
                const { firstName, lastName, email, password } = req.body;
                const { userID } = req.lastUserValues;
                let hashedPassword;
                if(password) hashedPassword = await hashPassword(password);
                const userData = await updateUser(userID, firstName, lastName, email, hashedPassword, { getFullInfo: true });
                if(password || email) await clearAllCookies(req, res);
                return res.status(200).json({
                    status: 200,
                    message: "User data successfully updated",
                    verified: userData.credential[0].verified
                });
            }catch(err){
                return await handleError(req, res, err);
            }
        })
        .delete(isLoggedIn({ strict: true, sendResponseOnValidToken: false, returnLastUserValues: true }), isCsrfTokenValid(), userDeleteRateLimit, async (req, res) => {
            try{
                await deleteUser(req.lastUserValues.userID);
                await clearAllCookies(req, res);
                return res.status(200).json({
                    status: 200,
                    message: "User successfully deleted"
                });
            }catch(err){
                return await handleError(req, res, err);
            }
        });
}