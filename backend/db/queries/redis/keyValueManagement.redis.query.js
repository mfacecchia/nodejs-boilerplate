import { RedisClient } from '../../redisClient.db.js';
import AppError, { TokenValidationError, DataFetchError, NotFoundError, CodeValidationError } from '../../../src/errors/custom.errors.js';
import 'dotenv/config';
import { logError } from '../../../src/errors/errorHandler.errors.js';


const redis = new RedisClient(process.env.REDIS_URL);

const redisPrefixes = {
    JWT: {
        keyPrefix: 'JWT',
        invalidKeyError: new TokenValidationError('Invalid authorization token.')
    },
    CSRF: {
        keyPrefix: 'CSRF',
        invalidKeyError: new TokenValidationError('Invalid security token.')
    },
    emailVerification: {
        keyPrefix: 'emailVerification',
        invalidKeyError: new CodeValidationError('Invalid Email verification code.')
    },
    passwordReset: {
        keyPrefix: 'passwordReset',
        invalidKeyError: new CodeValidationError('Invalid password reset code.')
    }
};

/**
 * Gets the key-related value by querying Redis storage
 * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key...
 * ...otherwise for custom keys just pass your custom `key` and leave `code` empty
 * @param {string} key
 * @param {string} code
 * @returns The value in form of `string`
 * @throws Custom `NotFoundError` or `DataFetchError`
 */
export async function getKeyValue(key, code = undefined){
    try{
        const chosenRedisPrefix = redisPrefixes[key];
        const fullKey = chosenRedisPrefix? `${chosenRedisPrefix.keyPrefix}:${code}`: key;
        await redis.connect();
        const value = await redis.client.get(fullKey);
        if(!value) throw chosenRedisPrefix? chosenRedisPrefix.invalidKeyError: new NotFoundError('Value not found.');
        return value;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new DataFetchError('Could not fetch data.');
    }
}

/**
 * Checks if the key-value pair is present in Redis storage
 * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key...
 * ...otherwise for custom keys just pass your custom `key` and leave `code` empty
 * @param {string} key 
 * @param {string} code 
 * @returns The key-value pair 'presence' state in form of `Boolean`
 * @throws Custom `DataFetchError`
 */
export async function isKeyValueExistent(key, code = undefined){
    try{
        const chosenRedisPrefix = redisPrefixes[key];
        const fullKey = chosenRedisPrefix? `${chosenRedisPrefix.keyPrefix}:${code}`: key;
        await redis.connect();
        const keyValueExists = await redis.client.exists(fullKey);
        return Boolean(keyValueExists);
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new DataFetchError('Could not fetch data.');
    }
}

/**
 * Stores the key-value pair in Redis storage with a custom `expiryInSeconds`
 * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key...
 * ...otherwise for custom keys just pass your custom `key` and leave `code` empty
 * @param {string} key 
 * @param {string} code 
 * @param {string} value 
 * @param {number} expiryInSeconds 
 * @returns `true` if the key-value pair is successfully stored
 * @throws Custom `DataFetchError`
 */
export async function storeKeyValue(key, code = undefined, value, expiryInSeconds = 0){
    try{
        const chosenRedisPrefix = redisPrefixes[key];
        const fullKey = chosenRedisPrefix? `${chosenRedisPrefix.keyPrefix}:${code}`: key;
        const options = {};
        if(expiryInSeconds) options.EX = expiryInSeconds
        await redis.connect();
        await redis.client.set(fullKey, value, options);
        return true;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new DataFetchError('Could not fetch data.');
    }
}

/**
 * Removes the key-value pair from Redis storage
 * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key...
 * ...otherwise for custom keys just pass your custom `key` and leave `code` empty
 * @param {string} key 
 * @param {string} code 
 * @returns `true` whetever the key-value pair is removed or not
 * @throws Custom `DataFetchError`
 */
export async function removeKeyValue(key, code = undefined){
    try{
        const chosenRedisPrefix = redisPrefixes[key];
        const fullKey = chosenRedisPrefix? `${chosenRedisPrefix.keyPrefix}:${code}`: key;
        await redis.connect();
        await redis.client.del(fullKey);
        return true;
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        throw new DataFetchError('Could not fetch data.');
    }
}