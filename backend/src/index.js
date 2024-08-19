import express from 'express';
import 'dotenv/config';


const app = express();


app.get('/ping', (req, res) => {
    res.status(200);
    res.send('Pong');
});

app.listen(process.env.PORT, () => {
    console.log("Listening.");
});