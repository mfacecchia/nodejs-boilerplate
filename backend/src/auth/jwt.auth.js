import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppError, { JWTGenerationError } from '../errors/custom.errors.js';
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