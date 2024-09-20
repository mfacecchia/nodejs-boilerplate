import express from 'express';
import 'dotenv/config';
import userAuth from './routes/auth.routing.mjs';


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
// Remove the line below if you want to show the 'x-powered-by' header in the response (NOT recommended)
app.set('x-powered-by', false);


app.get('/', (req, res) => {
    res.render('pages/index');
});

userAuth(app);

// 404 status code error handling
app.use((req, res) => {
    return res.render('pages/404');
});

app.listen(process.env.PORT, () => {
    console.log("Listening.");
});