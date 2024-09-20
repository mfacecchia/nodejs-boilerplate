import fetch from 'node-fetch';
import 'dotenv/config';
import { logError } from '../errors/errorHandler.errors.mjs';


export default function userAuth(app){
    app.get('/user/verify', async (req, res) => {
        const { q: verificationCode} = req.query;
        try{
            const response = await fetch(`${process.env.BACKEND_ADDRESS}/user/verify`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ verificationCode: verificationCode })
            });
            return res.render('pages/emailVerification', {successful: response.ok});
        }catch(err){
            logError(err);
            return res.render('pages/emailVerification', {successful: false});
        }
    });
}