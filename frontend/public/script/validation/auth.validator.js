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

async function validateSignup(userData){
    if(!isObject(userData)) return;
    try{
        const validators = {
            email: {
                ...defaultPresenceValidator,
                ...defaultStringMaxLength,
                ...defaultEmailFieldValidator
            },
            password: {
                ...defaultPresenceValidator,
                ...defaultPasswordMinLength
            },
            passwordVerify: {
                ...defaultEqualityValidator
            },
            firstName: {
                ...defaultPresenceValidator,
                ...defaultStringMaxLength
            },
            lastName: {
                ...defaultPresenceValidator,
                ...defaultStringMaxLength
            }
        };
        await validate.async(userData, validators);
    }catch(err){
        throw err;
    }
    return;
}