import validate from "validate.js";
import { defaultEmailFieldValidator, defaultPasswordMinLength, defaultPresenceValidator, defaultPrismaMaxLength } from "../utils/validators.utility.js";
import { ValidationError } from "../errors/custom.errors.js";
import { handleError, logError } from "../errors/errorHandler.errors.js";
import { isEmailRegistered } from "../utils/validators.utility.js";


export function validateLogin(){
    return async (req, res, next) => {
        try{
            const validators = {
                email: {
                    ...defaultPresenceValidator,
                    ...defaultEmailFieldValidator
                },
                password: {
                    ...defaultPresenceValidator
                }
            };
            await validate.async(req.body, validators, { wrapErrors: ValidationError });
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
        return next();
    }
}

export function validateSignup(){
    return async (req, res, next) => {
        try{
            const validators = {
                email: {
                    ...defaultPresenceValidator,
                    ...defaultPrismaMaxLength,
                    ...defaultEmailFieldValidator,
                    isEmailRegistered: true
                },
                password: {
                    ...defaultPresenceValidator,
                    ...defaultPasswordMinLength
                },
                firstName: {
                    ...defaultPresenceValidator,
                    ...defaultPrismaMaxLength
                },
                lastName: {
                    ...defaultPresenceValidator,
                    ...defaultPrismaMaxLength
                }
            };
            validate.validators.isEmailRegistered = isEmailRegistered;
            await validate.async(req.body, validators, { wrapErrors: ValidationError });
            // Formatting input
            req.body.email = req.body.email.toLowerCase();
            req.body.firstName = validate.capitalize(req.body.firstName.trim());
            req.body.lastName = validate.capitalize(req.body.lastName.trim());
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
        return next();
    }
}