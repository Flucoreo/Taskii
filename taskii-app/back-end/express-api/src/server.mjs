import express, { request } from 'express';
import mysql from 'mysql2';
import db from './db.mjs'
import dotenv from 'dotenv';
import cors from 'cors'

// load dotenv variables
dotenv.config({ path: '../.env' })

const app = express();
const PORT = process.env.SERVER_PORT || 2500;

// cors middleware to allow React App to access our API
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.listen(PORT, () => {
    console.log("Running on Port", PORT)
})

app.get('/api/tasks', async (request, response) => {

    const queryString = 'SELECT * FROM tasks';
    let data = [];

    try {
        const [rows, fields] = await db.promise().query(queryString);
        data = rows
    } catch (err) {
        console.log(err);
        return response.status(500).send("Could not get data from server")
    }

    return response.status(200).json(data)
});

// npx nodemon server.mjs