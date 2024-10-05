/**
 * Checks the current user's verification status and blocks it from making the request if not verified.
 * The `strict` parameter can be set to `true` in case you want to send 403 status code if the user is not verified as well
 * @param {object} options
 * @returns response Object (`res`) in form of JSON
 */
export default function isEmailVerified({ strict = true, sendResponseOnVerifiedEmail = false } = {}){
    return async (req, res, next) => {
        const { verified: isEmailVerified } = req.lastUserValues.credential[0];
        if(strict && !isEmailVerified){
            return res.status(403).json({
                status: 403,
                message: "Email not verified. Please verify your account's Email to continue."
            });
        }
        if(sendResponseOnVerifiedEmail && isEmailVerified){
            return res.status(200).json({
                status: 200,
                message: "Email already verified."
            });
        }
        return next();
    }
}