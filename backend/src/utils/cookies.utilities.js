import AppError, { GenericAppError } from "../errors/custom.errors.js";


export const defaultCookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: "none"
};

export function clearAllCookies(req, res){
    try{
        for(const cookie in req.cookies){
            res.clearCookie(cookie);
        }
        // Future update: remove csrf && jwt from REDIS storage
    }catch(err){
        if(err instanceof AppError) throw err;
        else throw new GenericAppError('An unexpected error occurred. Please try again later.', 500);
    }
}