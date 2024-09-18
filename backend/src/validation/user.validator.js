import validate from "validate.js";
import { defaultEmailFieldValidator, defaultPasswordMinLength, defaultPresenceValidator, defaultPrismaMaxLength, isEmailRegistered, oldPasswordMatches } from '../utils/validators.utility.js';
import { ValidationError } from '../errors/custom.errors.js';
import { handleError, logError } from '../errors/errorHandler.errors.js';


export function validateUserUpdate(){
    return async (req, res, next) => {
        try{
            const { password: oldPassword } = req.lastUserValues.credential[0];
            // NOTE: If the field is not passed in `req.body`, the currently set value is kept
            const validators = {};
            if(req.body.firstName){
                validators.firstName = {
                    ...defaultPrismaMaxLength
                };
            }
            if(req.body.lastName){
                validators.lastName = {
                    ...defaultPrismaMaxLength
                };
            }
            if(req.body.email){
                validators.email = {
                    ...defaultPrismaMaxLength,
                    ...defaultEmailFieldValidator,
                    isEmailRegistered: true,
                };
            }
            if(req.body.password){
                validators.oldPassword = {
                    ...defaultPresenceValidator,
                    oldPasswordMatches: {
                        oldPassword: oldPassword,
                        invalidOnMatching: false
                    }
                };
                validators.password = {
                    ...defaultPasswordMinLength,
                    oldPasswordMatches: {
                        oldPassword: oldPassword,
                        invalidOnMatching: true
                    }
                };
            };
            validate.validators.isEmailRegistered = isEmailRegistered;
            validate.validators.oldPasswordMatches = oldPasswordMatches;
            await validate.async(req.body, validators, { wrapErrors: ValidationError });
            // Formatting input
            if(req.body.email && req.body.email.toLowerCase() !== req.lastUserValues.email.toLowerCase()) req.body.email = req.body.email.toLowerCase();
            else req.body.email = undefined;
            if(req.body.firstName) req.body.firstName = validate.capitalize(req.body.firstName.trim());
            if(req.body.lastName) req.body.lastName = validate.capitalize(req.body.lastName.trim());
        }catch(err){
            logError(err);
            return await handleError(req, res, err);
        }
        return next();
    }
}