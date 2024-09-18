import crypto from 'crypto';
import 'dotenv/config';
import { isKeyValueExistent, storeKeyValue } from '../../db/queries/redis/keyValueManagement.redis.query.js';
import AppError, { GenericAppError, GenerationError } from '../errors/custom.errors.js';


const codesOptions = {
    emailVerification: {
        url: `/user/verify`,
        generationFailedError: new GenerationError('Unable to generate a valid Email verification code.')
    },
    passwordReset: {
        url: `/user/reset`,
        generationFailedError: new GenerationError('Unable to generate a valid password reset code.')
    }
};

function getCodeOptions(codeType){
    /**
     * Checks if the selected code `codeType` is in the `codeOptions` Object
     * Returns `true` if valid, otherwise throws a `GenericAppError` error
     */
    if(!Object.keys(codesOptions).includes(codeType)) throw new GenerationError('Could not generate a valid code.');
    return codesOptions[codeType];
}

export async function generateCode(codeType, userID){
    /**
     * Generates and stores a valid code for email verification/password reset functionalities
     * Requires a valid `userID` in order to assign the generated code to an existing user
     * Returns an Object with the code and the URL to frontend page
     * NOTE: The `codeType` parameter MUST be one of the `codesOptions` Obejct keys
     */
    try{
        const chosenCodeOptions = getCodeOptions(codeType);
        let generationTries = 0;
        let generatedCode;
        do{
            generatedCode = crypto.randomBytes(4).toString('hex');
            generationTries += 1;
        // Possible verification code duplication
        }while(await isKeyValueExistent(codeType, generatedCode) && generationTries < 10);
        if(generationTries >= 10 && await isKeyValueExistent(codeType, generatedCode)) throw chosenCodeOptions.generationFailedError;
        await storeKeyValue(codeType, generatedCode, userID, 10 * 60);
        return {
            code: generatedCode,
            link: `${process.env.FRONTEND_ADDRESS}${chosenCodeOptions.url}?q=${generatedCode}`
        };
    }catch(err){
        if(err instanceof AppError) throw err;
        else throw new GenericAppError('An unexpected error occurred. Please try again later.', 500);
    }
}