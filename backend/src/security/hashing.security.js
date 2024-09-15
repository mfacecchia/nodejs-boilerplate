import argon2 from 'argon2';
import { PasswordHashError } from '../errors/custom.errors.js';


export async function hashPassword(plainTextPassword){
    try{
        const hashedPass = await argon2.hash(plainTextPassword);
        return hashedPass;
    }catch(err){
        throw new PasswordHashError('Could not hash password.');
    }
}