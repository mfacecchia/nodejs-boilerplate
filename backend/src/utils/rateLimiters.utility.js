import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';


const defaultStatusCode = 429;
const defaultRateLimiterOptions = {
    standardHeaders: 'draft-6',
    keyGenerator: (req, res) => { requestIp.getClientIp(req); }
}

export const loginRateLimit = rateLimit({
    ...defaultRateLimiterOptions,
    // 60 seconds
    windowMs: 60 * 1000,
    limit: 5,
    message: {
        status: defaultStatusCode,
        message: "Too many login attempts. Please try again in a few minutes."
    }
});

export const signupRateLimit = rateLimit({
    ...defaultRateLimiterOptions,
    // 30 minutes
    windowMs: 30 * 60 * 1000,
    limit: 3,
    message: {
        status: defaultStatusCode,
        message: "Too many signup attempts. Please try again in a few minutes."
    }
});

export const userUpdateRateLimit = rateLimit({
    ...defaultRateLimiterOptions,
    // 30 minutes
    windowMs: 30 * 60 * 1000,
    limit: 10,
    message: {
        status: defaultStatusCode,
        message: "Too many user update attempts. Please try again in a few minutes."
    }
});

export const userDeleteRateLimit = rateLimit({
    ...defaultRateLimiterOptions,
    // 30 minutes
    windowMs: 30 * 60 * 1000,
    limit: 3,
    message: {
        status: defaultStatusCode,
        message: "Too many user deletion attempts. Please try again in a few minutes."
    }
});