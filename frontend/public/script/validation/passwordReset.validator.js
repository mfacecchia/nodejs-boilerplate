async function validatePasswordReset(userData){
    try{
        const validators = {
            password: {
                ...defaultPresenceValidator,
                ...defaultPasswordMinLength
            }
        };
        await validate.async(userData, validators);
    }catch(err){
        throw err;
    }
    return;
}