import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppError, { JWTGenerationError, JWTValidationError } from '../errors/custom.errors.js';
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
        console.log(err);
        if(err instanceof AppError) throw err;
        else throw new JWTGenerationError('Could not generate authorization token.');
    }
}

// TODO: Add jwt presence check in Redis storage function call
export function validateJWT(jsonWebToken, secret, { getFullToken = false } = {}){
    try{
        const decodedToken = jwt.verify(jsonWebToken, secret, { complete: Boolean(getFullToken) });
        return decodedToken;
    }catch(err){
        if(err instanceof AppError) throw err;
        if(err.name === 'TokenExpiredError') throw new JWTValidationError("Authorization token Expired.");
        else if(err.name === 'JsonWebTokenError') throw new JWTValidationError('Invalid authorization token.');
        throw new JWTValidationError('Could not validate the authorization token.');
    }
}