import AppError, { ValidationError } from './custom.errors.js';
import { clearAllCookies } from '../utils/cookies.utility.js';
import 'dotenv/config';


/**
 * Handles the provided `err` and returns a meaningful response based on the error type
 * @param {object} req 
 * @param {object} res 
 * @param {Error} err 
 * @returns response Object (`res`) in form of JSON
 */
export async function handleError(req, res, err){
    logError(err);
    if(!(err instanceof AppError)){
        return res.status(500).json({
            status: 500,
            message: "An unexpected error occurred. Please try again later."
        });
    }
    if(err.statusCode === 401){
        try{
            await clearAllCookies(req, res);
        }catch(err){
            logError(err);
        }
    }
    if(err instanceof ValidationError){
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            validationErrors: err.errors
        });
    }
    return res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    });
}

/**
 * Logs the caught `err` in the console if the app environment is 'development'
 * @param {Error} err 
 */
export function logError(err){
    if(process.env.NODE_ENV === 'development') console.error(err);
}