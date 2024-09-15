import Tokens from "csrf";
import { getKeyValue } from "../../db/queries/redis/keyValueManagement.redis.query.js";
import { handleError, logError } from "../errors/errorHandler.errors.js";
import { TokenValidationError } from "../errors/custom.errors.js";


export default function isCsrfTokenValid(){
    return async (req, res, next) => {
        try{
            const keyName = 'CSRF';
            const tokens = new Tokens();
            const csrfToken = req.cookies?.csrf || req.body.csrf;
            const secret = await getKeyValue(keyName, csrfToken);
            if(tokens.verify(secret, csrfToken)) return next();
            throw new TokenValidationError('Invalid security token.');
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
    }
}