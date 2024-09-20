import fetch from 'node-fetch';
import 'dotenv/config';
import { logError } from '../errors/errorHandler.errors.mjs';


export default function userAuth(app){
    app.get('/login', async (req, res) => {
        res.render('pages/login');
    });

    app.get('/signup', async (req, res) => {
        res.render('pages/signup');
    });

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

    app.get('/user/reset', async (req, res) => {
        const resetToken = req.query.q;
        if(!resetToken){
            res.render('pages/passwordResetGeneration');
            return;
        }
        res.render('pages/passwordReset');
    });
}