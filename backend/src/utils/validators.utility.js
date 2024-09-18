import argon2 from 'argon2';
import AppError, { FoundError, DataFetchError, PasswordReuseError, PasswordMismatchError } from "../errors/custom.errors.js";
import { findUser } from "../../db/queries/mysql/user.mysql.query.js";
import { logError } from "../errors/errorHandler.errors.js";


export const defaultPresenceValidator = {
    presence: {
        allowEmpty: false,
        message: "^This field is required"
    }
};

export const defaultPrismaMaxLength = {
    length: {
        maximum: 191,
        tooLong: '^Too long (maximum length is %{count} characters)'
    }
};

export const defaultPasswordMinLength = {
    length: {
        minimum: 15,
        tooShort: '^Too short (minimum length is %{count} characters).'
    }
};

export const defaultEmailFieldValidator = {
    email: {
        message: '^Not a valid email'
    }
};

export const isEmailRegistered = (value) => {
    /**
     * Checks if the Email entered is already present in the database (a.k.a. user already registered)
     */
    return new Promise(async (resolve, reject) => {
        try{
            // Skipping value check if empty
            if(!value) return resolve();
            await findUser(value, { isID: false, throwOnFound: true, getFullInfo: false });
            resolve();
        }catch(err){
            logError(err);
            if(err instanceof FoundError) return resolve('^Email already in use');
            if(err instanceof AppError) return reject(err);
            return reject(new DataFetchError('Could not fetch data.'));
        }
    });
}

export const oldPasswordMatches = (value, options) => {
    /**
     * Checks if the `value` matches with `options.oldPassword`
     * Resolves with empty value if valid, otherwise resolves with a message if invalid
     * expected `options` fields are `oldPassword`, and `invalidOnMatching`
     * NOTE: `options.oldPassword` MUST be hashed using `argon2id` algorithm
     */
    return new Promise(async (resolve, reject) => {
        try{
            // Skipping value check if empty
            if(!value) return resolve();
            const passwordMatching = await argon2.verify(options.oldPassword, value);
            if(passwordMatching && options.invalidOnMatching) throw new PasswordReuseError('^Cannot be the same password as the currently set one');
            if(!passwordMatching && !options.invalidOnMatching) throw new PasswordMismatchError('^Invalid password');
            return resolve();
        }catch(err){
            logError(err);
            if(err instanceof PasswordMismatchError || err instanceof PasswordReuseError) return resolve(err.message);
            if(err instanceof AppError) return reject(err);
            return reject(new DataFetchError('Could not fetch data.'));
        }
    });
};