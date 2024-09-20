async function validateLogin(userData){
    if(!isObject(userData)) return;
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
        await validate.async(userData, validators);
    }catch(err){
        throw err;
    }
    return;
}