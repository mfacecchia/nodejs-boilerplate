async function validatePasswordReset(userData){
    try{
        const validators = {
            password: {
                ...defaultPresenceValidator,
                ...defaultPasswordMinLength
            },
            passwordVerify: {
                ...defaultEqualityValidator
            }
        };
        await validate.async(userData, validators);
    }catch(err){
        throw err;
    }
    return;
}