import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppError, { TokenGenerationError, TokenValidationError } from '../errors/custom.errors.js';
import { logError } from '../errors/errorHandler.errors.js';
import isObject from '../utils/isObject.utility.js';


// NOTE: `storeToken` as a flag to store JWT in Redis storage
// TODO: Add store JWT in Redis function call
export function generateJWT(payload = {}, { rememberMe = false, storeToken = false } = {}){
    try{
        const options = {};
        // 60 Days default expiry (in seconds)
        const tokenExpiry = 60 * 60 * 24 * 60;
        if(!rememberMe) options.expiresIn = tokenExpiry;
        if(!isObject(payload)) payload = {};
        const jsonWebToken = jwt.sign(payload, process.env.JWT_SECRET, options);
        return jsonWebToken;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        else throw new TokenGenerationError('Could not generate authorization token.');
    }
}

// TODO: Add jwt presence check in Redis storage function call
export function validateJWT(jsonWebToken, secret, { getFullToken = false } = {}){
    try{
        const decodedToken = jwt.verify(jsonWebToken, secret, { complete: Boolean(getFullToken) });
        return decodedToken;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        if(err.name === 'TokenExpiredError') throw new TokenValidationError("Authorization token Expired.");
        else if(err.name === 'JsonWebTokenError') throw new TokenValidationError('Invalid authorization token.');
        throw new TokenValidationError('Could not validate the authorization token.');
    }
}