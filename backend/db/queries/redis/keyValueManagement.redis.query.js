import { RedisClient } from '../../redisClient.db.js';
import AppError, { TokenValidationError, DataFetchError, NotFoundError } from '../../../src/errors/custom.errors.js';
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
    }
};

export async function getKeyValue(key, code = undefined){
    /**
     * Gets the key-related value by querying Redis storage
     * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key
     * Otherwise for custom keys just pass your custom `key`
     * Returns the value if found, otherwise throws error-related custom `AppError`
     */
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

export async function isKeyValueExistent(key, code = undefined){
    /**
     * Checks if the key-value pair is in Redis storage
     * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key
     * Returns a Boolean value representing the key-value pair 'presence' state, otherwise throws error-related custom `AppError`
     */
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


export async function storeKeyValue(key, code = undefined, value, expiryInSeconds = 0){
    /**
     * Stores the key-value pair in Redis storage with a custom `expiryInSeconds`
     * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key
     * Returns `true` if the key-value pair is successfully stored, otherwise throws error-related custom `AppError`
     */
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

export async function removeKeyValue(key, code = undefined){
    /**
     * Removes the key-value pair from Redis storage
     * For custom preset keys, pass the prefix name in the `key` function parameter and the relative `code` to embed with the key
     * Returns `true` whetever the key-value pair is removed or not, otherwise throws error-related custom `AppError`
     */
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