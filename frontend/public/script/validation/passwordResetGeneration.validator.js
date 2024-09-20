async function validatePasswordResetGeneration(userData){
    try{
        const validators = {
            email: {
                ...defaultPresenceValidator,
                ...defaultEmailFieldValidator
            }
        };
        await validate.async(userData, validators);
    }catch(err){
        throw err;
    }
    return;
}