import Tokens from 'csrf';
import { getKeyValue, storeKeyValue } from '../../db/queries/redis/keyValueManagement.redis.query.js';
import AppError, { TokenGenerationError, TokenValidationError } from '../errors/custom.errors.js';
import { logError } from '../errors/errorHandler.errors.js';


export async function generateCsrf({ storeToken = false } = {}){
    try{
        const redisKeyName = 'CSRF';
        const tokens = new Tokens();
        const secret = await tokens.secret();
        const csrfToken = tokens.create(secret);
        if(storeToken) await storeKeyValue(redisKeyName, csrfToken, secret, 0);
        return {
            secret: secret,
            token: csrfToken
        };
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new TokenGenerationError('Could not generate security token.');
    }
}

export async function validateCsrf(csrfToken){
    try{
        const redisKeyName = 'CSRF';
        const tokens = new Tokens();
        const csrfSecret = await getKeyValue(redisKeyName, csrfToken);
        if(!tokens.verify(csrfSecret, csrfToken)) throw new TokenValidationError('Invalid security token.');
        return true;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new TokenValidationError('Could not validate the security token.');
    }
}