import express, { request } from 'express';

const app = express();
// add .env file!
const PORT = 2000;


app.listen(PORT, () => {
    console.log("Running on Port", PORT)
})

app.get('/', (request, response) => {
    console.log("connected to /hi route");
    return response.status(200).send("hello world!");
})

