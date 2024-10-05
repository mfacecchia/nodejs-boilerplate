import Tokens from "csrf";
import { getKeyValue } from "../../db/queries/redis/keyValueManagement.redis.query.js";
import { handleError, logError } from "../errors/errorHandler.errors.js";
import { TokenValidationError } from "../errors/custom.errors.js";


/**
 * Checks if the user's CSRF token is valid by checking its existence in Redis storage
 * and by verifying it with the obtained `secret`
 * @throws Custom `TokenValidationError`
 */
export default function isCsrfTokenValid(){
    return async (req, res, next) => {
        try{
            const redisKeyName = 'CSRF';
            const tokens = new Tokens();
            const csrfToken = req.cookies?.csrf || req.body.csrf;
            const secret = await getKeyValue(redisKeyName, csrfToken);
            if(tokens.verify(secret, csrfToken)) return next();
            throw new TokenValidationError('Invalid security token.');
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
    }
}