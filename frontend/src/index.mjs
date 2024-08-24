import express from 'express';
import 'dotenv/config';


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
// Remove the line below if you want to show the 'x-powered-by' header in the response (NOT recommended)
app.set('x-powered-by', false);


app.get('/', (req, res) => {
    res.render('pages/index');
});

// 404 status code error handling
app.use((req, res) => {
    // TODO: Render 404 page instead of JSON response
    return res.status(404).json({
        status: 404,
        message: `Route ${req.baseUrl + req.path} not found.`
    });
});

app.listen(process.env.PORT, () => {
    console.log("Listening.");
});