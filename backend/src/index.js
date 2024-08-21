import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';


const app = express();
// Remove the line below if you want to show the 'x-powered-by' header in the response (NOT recommended)
app.set('x-powered-by', false);
app.use(cors({
    origin: process.env.FRONTEND_ADDRESS,
    // Set the option below to `false` if you want to disallow credentials from being set in the request header
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
/** 
 * Remove comment from the line below if you want to accept data from forms as well (forms with the `action` attribute) (NOT recommended)
 * Intentionally disabled to ensure protection againts CORS attacks 
 */
// app.use(express.urlencoded({ extended: true }));


// Ping this route to check whetever the server is running or not
app.get('/ping', (req, res) => {
    res.status(200);
    res.send('Pong');
});

// 404 status code error handling
app.use((req, res) => {
    return res.status(404).json({
        status: 404,
        message: `Route ${req.baseUrl + req.path} not found.`
    });
});

app.listen(process.env.PORT, () => {
    console.log("Listening.");
});