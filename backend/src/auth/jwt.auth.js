import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppError, { TokenGenerationError, TokenValidationError } from '../errors/custom.errors.js';
import { logError } from '../errors/errorHandler.errors.js';
import isObject from '../utils/isObject.utility.js';
import { isKeyValueExistent, storeKeyValue } from '../../db/queries/redis/keyValueManagement.redis.query.js';


// NOTE: `storeToken` as a flag to store JWT in Redis storage
export async function generateJWT(payload = {}, userID = undefined, { rememberMe = false, storeToken = false } = {}){
    try{
        const redisKeyName = 'JWT';
        const options = {};
        // 60 Days default expiry (in seconds)
        const tokenExpiry = 60 * 60 * 24 * 60;
        if(!rememberMe) options.expiresIn = tokenExpiry;
        if(!isObject(payload)) payload = {};
        const jsonWebToken = jwt.sign(payload, process.env.JWT_SECRET, options);
        if(storeToken) await storeKeyValue(redisKeyName, jsonWebToken, userID, !rememberMe? tokenExpiry: 0);
        return jsonWebToken;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        else throw new TokenGenerationError('Could not generate authorization token.');
    }
}

export async function validateJWT(jsonWebToken, secret, { getFullToken = false } = {}){
    try{
        const redisKeyName = 'JWT';
        const decodedToken = jwt.verify(jsonWebToken, secret, { complete: Boolean(getFullToken) });
        if(!(await isKeyValueExistent(redisKeyName, jsonWebToken))) throw new TokenValidationError('Invalid authorization token.');
        return decodedToken;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        if(err.name === 'TokenExpiredError') throw new TokenValidationError("Authorization token Expired.");
        else if(err.name === 'JsonWebTokenError') throw new TokenValidationError('Invalid authorization token.');
        throw new TokenValidationError('Could not validate the authorization token.');
    }
}