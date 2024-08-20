import AppError, { ValidationError } from "./custom.errors.js";


export async function handleError(req, res, err){
    /**
     * Handles the provided `err` and returns a meaningful response based on the error type
     */
    if(err instanceof AppError){
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
    return res.status(500).json({
        status: 500,
        message: "An unexpected error occurred. Please try again later."
    });
}