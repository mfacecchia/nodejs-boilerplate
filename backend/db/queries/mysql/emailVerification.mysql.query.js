import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import prisma from '../../../db/prismaClient.db.js';
import { DatabaseConnectionError, DatabaseQueryError } from '../../../src/errors/custom.errors.js';
import { logError } from '../../../src/errors/errorHandler.errors.js';


/**
 * @param {number} userID 
 * @returns `true` in case the email is successfully verified
 * @throws Custom `DatabaseConnectionError` or `DatabaseQueryError`
 */
export async function verifyEmail(userID){
    try{
        await prisma.credential.update({
            data: {
                verified: true
            },
            where: {
                userID: +userID
            }
        });
        return true;
    }catch(err){
        logError(err);
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else if(err instanceof PrismaClientKnownRequestError){
            if(err.code === 'P2004') throw new DatabaseQueryError('Could not verify user email. Invalid data.');
        }
        else if(err instanceof PrismaClientValidationError) throw new DatabaseQueryError('Could not verify user email. Invalid or missing required data.');
        throw new DatabaseQueryError('Unexpected error while verifying user email. Please try again later.');
    }
}