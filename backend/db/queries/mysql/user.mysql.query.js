import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import prisma from '../../prismaClient.db.js';
import AppError, { DatabaseConnectionError, DatabaseQueryError, DataFetchError, FoundError, NotFoundError } from '../../../src/errors/custom.errors.js';
import { logError } from '../../../src/errors/errorHandler.errors.js';


/**
 * Finds a user from the database by a given valid `userField`
 * The field to check must be either an ID (Number) or an email (String), defined by `isID` boolean parameter
 * @param {string | number} userField 
 * @param {object} options
 * @returns Found user in form of Object
 * @throws Custom `FoundError` or `NotFoundError` based on the `throwOnFound` param value, or `DatabaseConnectionError`, or `DataFetchError`
 */
export async function findUser(userField, { isID = true, throwOnFound = false, getFullInfo = false } = {}){
    try{
        const user = await prisma.user.findFirst({
            include: {
                credential: Boolean(getFullInfo)
            },
            where: {
                credential: {
                    some: isID? { userID: +userField }: { email: String(userField) }
                }
            }
        });
        if(user && throwOnFound) throw new FoundError('User found.');
        if(!user && !throwOnFound) throw new NotFoundError('User not found.');
        return user;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else throw new DataFetchError('Could not fetch data.');
    }
}

/**
 * Creates a new user in the database using Email/Password combination
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} hashedPassword 
 * @returns Created user in form of Object
 * @throws Custom `DatabaseConnectionError`, `DatabaseQueryError`, `FoundError`, or `FoundError`
 */
export async function createUserWithCredentials(firstName, lastName, email, hashedPassword){
    try{
        const user = await prisma.user.create({
            data: {
                firstName: firstName? String(firstName): undefined,
                lastName: lastName? String(lastName): undefined,
                createdAt: Math.floor(Date.now() / 1000),
                updatedAt: Math.floor(Date.now() / 1000),
                credential: {
                    create: {
                        email: email? String(email): undefined,
                        password: hashedPassword? String(hashedPassword): undefined
                    }
                }
            }
        });
        return user;
    }catch(err){
        logError(err);
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else if(err instanceof PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new FoundError('Could not create the user. Already registered.');
            else if(err.code === 'P2004') throw new DatabaseQueryError('Could not create the user. Invalid data.');
        }
        else if(err instanceof PrismaClientValidationError) throw new DatabaseQueryError('Could not create the user. Invalid or missing required data.');
        throw new DatabaseQueryError('Unexpected error while creating the user. Please try again later.');
    }
}

/**
 * Creates a new user in the database using OAuth authentication
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {number} googleID 
 * @param {number} githubID 
 * @returns Created user in form of Object
 * @throws Custom `DatabaseConnectionError` or `DatabaseQueryError`
 */
export async function createUserWithOAuth(firstName, lastName, googleID, githubID){
    if(!googleID && !githubID) throw new DatabaseQueryError('Could not create the user. Invalid or missing required data.');
    try{
        const user = await prisma.user.create({
            data: {
                firstName: String(firstName),
                lastName: String(lastName),
                createdAt: Math.floor(Date.now() / 1000),
                updatedAt: Math.floor(Date.now() / 1000),
                oauth: {
                    create: {
                        googleID: googleID? +googleID: undefined,
                        githubID: githubID? +githubID: undefined
                    }
                }
            }
        });
        return user;
    }catch(err){
        logError(err);
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else if(err instanceof PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new DatabaseQueryError('Could not create the user. Already registered.');
            else if(err.code === 'P2004') throw new DatabaseQueryError('Could not create the user. Invalid or missing required data.');
        }
        throw new DatabaseQueryError('Unexpected error while creating the user. Please try again later.');
    }
}

/**
 * Updates an already existing user on the database
 * @param {number} userID 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} hashedPassword 
 * @param {object} options
 * @returns Updated user in form of Object
 * @throws Custom `DatabaseConnectionError`, `DatabaseQueryError`, or `FoundError`
 */
export async function updateUser(userID, firstName, lastName, email, hashedPassword, { getFullInfo = false } = {}){
    try{
        const user = await prisma.user.update({
            data: {
                firstName: firstName? String(firstName): undefined,
                lastName: lastName? String(lastName): undefined,
                updatedAt: hashedPassword || email? Math.floor(Date.now() / 1000): undefined,
                credential: {
                    update: {
                        data: {
                            email: email? String(email): undefined,
                            password: hashedPassword? String(hashedPassword): undefined,
                            verified: email? false: undefined
                        },
                        where: {
                            userID: +userID
                        }
                    }
                }
            },
            where: {
                userID: +userID
            },
            include: {
                credential: Boolean(getFullInfo)
            }
        });
        return user;
    }catch(err){
        logError(err);
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else if(err instanceof PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new FoundError('Could not update the user. Email already registered.');
            else if(err.code === 'P2004') throw new DatabaseQueryError('Could not update the user. Invalid data.');
        }
        else if(err instanceof PrismaClientValidationError) throw new DatabaseQueryError('Could not update the user. Invalid or missing required data.');
        throw new DatabaseQueryError('Unexpected error while updating the user. Please try again later.');
    }
}

/**
 * Deletes an existing user from the database
 * @param {number} userID 
 * @returns Deleted user in form of Object
 */
export async function deleteUser(userID){
    try{
        const user = await prisma.user.delete({
            where: {
                userID: +userID
            }
        });
        return user;
    }catch(err){
        logError(err);
        if(err instanceof PrismaClientInitializationError) throw new DatabaseConnectionError('Failed connection to database.');
        else if(err instanceof PrismaClientKnownRequestError){
            if(err.code === 'P2025') throw new NotFoundError('Could not delete the user. User does not exist.');
        }
        throw new DatabaseQueryError('Unexpected error while updating the user. Please try again later.');
    }
}