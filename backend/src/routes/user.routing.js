import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import { handleError } from "../errors/errorHandler.errors.js";


export default function userManagement(app){
    app.route('/api/user')
        .get(isLoggedIn({ strict: true, sendResponseOnValidToken: false, returnLastUserValues: true }), async (req, res) => {
            try{
                const { firstName, lastName } = req.lastUserValues;
                const { email, verified } = req.lastUserValues.credential[0];
                const userData = { firstName, lastName, email, verified };
                return res.status(200).json({
                    status: 200,
                    message: "User found",
                    user: userData
                });
            }catch(err){
                return await handleError(req, res, err);
            }
        })
        
}