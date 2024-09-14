import { createClient } from 'redis';
import { logError } from '../src/errors/errorHandler.errors.js';
import { RedisConnectionError } from "../src/errors/custom.errors.js";


export class RedisClient {
    constructor(connectionURL) {
        this.connectionURL = connectionURL;
        this.client = null;
        this.isConnected = false;
        this.maxReconnectionAttempts = 25;
        this.currentReconnectionAttempts = 0;
    }

    async connect() {
        if (this.isConnected) return true;
        this.client = await createClient({ url: this.connectionURL })
            .on('connect', () => {
                this.isConnected = true;
                this.currentReconnectionAttempts = 0;
            })
            .on('error', (err) => {
                // Disconnected from Redis server
                if(err.code === 'ECONNREFUSED'){
                    this.isConnected = false;
                    this.hasReachedMaxRetries();
                }
                logError(err);
            })
            .on('end', () => {
                this.isConnected = false;
            })
            .on('reconnecting', () => {
                this.currentReconnectionAttempts += 1;
            })
            .connect();
        return true;
    }

    hasReachedMaxRetries(){
        if(this.currentReconnectionAttempts >= this.maxReconnectionAttempts){
            this.isConnected = false;
            throw new RedisConnectionError("Failed connection to database.");
        }
    }
}