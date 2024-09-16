import AppError, { GenericAppError } from '../errors/custom.errors.js';
import { logError } from '../errors/errorHandler.errors.js';
import { removeKeyValue } from '../../db/queries/redis/keyValueManagement.redis.query.js';


export async function clearAllCookies(req, res){
    try{
        const { userSession: jsonWebToken } = req.cookies;
        const csrfToken = req.cookies?.csrf || req.body.csrf;
        for(const cookie in req.cookies){
            res.clearCookie(cookie);
        }
        await Promise.all([
            removeKeyValue('JWT', jsonWebToken),
            removeKeyValue('CSRF', csrfToken)
        ]);
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        else throw new GenericAppError('An unexpected error occurred. Please try again later.', 500);
    }
}