import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';


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
        status: 429,
        message: "Too many login attempts. Please try again in a few minutes."
    }
});

export const signupRateLimit = rateLimit({
    ...defaultRateLimiterOptions,
    // 30 minutes
    windowMs: 30 * 60 * 1000,
    limit: 3,
    message: {
        status: 429,
        message: "Too many signup attempts. Please try again in a few minutes."
    }
});