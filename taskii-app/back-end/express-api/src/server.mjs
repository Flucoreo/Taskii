import express, { request, response } from 'express';
import mysql from 'mysql2';
import db from './db.mjs'
import dotenv from 'dotenv';
import cors from 'cors'

// load dotenv variables
dotenv.config({ path: '../.env' })

const app = express();
const PORT = process.env.SERVER_PORT;

// cors middleware to allow React App to access our API
app.use(cors({
    origin: process.env.REACT_APP_ADRESS
}));

// Middleware to parse JSON
app.use(express.json());

// start the server and listen to the port
app.listen(PORT, () => {
    console.log("Running on Port", PORT)
})



// get all the tasks
app.get('/api/tasks', async (request, response) => {

    const queryString = 'SELECT * FROM tasks';
    let data = [];

    try {
        const [rows, fields] = await db.promise().query(queryString);
        data = rows
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not get data from server");
    }

    return response.status(200).json(data)
});



// add a task
app.post('/api/tasks', async (request, response) => {

    // get the task object from the client and convert it to an array
    const taskObject = request.body;
    const taskArray = [
        taskObject.title,
        taskObject.notes,
        taskObject.completed,
        taskObject.task_group,
        taskObject.dueDate,
        taskObject.priority,
        taskObject.progress,
        taskObject.checklist
    ]
    // we dont use the client values "taskObject.task_id, taskObject.dateCreated, and taskObject.dateModified"
    // because the database creates those values for us

    const queryString = 
    'INSERT INTO tasks (title, notes, completed, task_group, dueDate, priority, progress, dateCreated, dateModified, checklist) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_DATE(), ?)';
    let result;
    let sqlTask;

    // add the task to the sever
    try {
        [result] = await db.promise().query(queryString, taskArray);
    } catch (err){
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not insert data");
    }

    // since the server adds values to task, we need to get the server's version of task to return to user
    try {
        const [rows, fields] = await db.promise().query(`SELECT * FROM tasks WHERE task_id = ${result.insertId}`);
        sqlTask = rows;
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not return data");
    }

    return response.status(201).json(sqlTask[0])
})


// npx nodemon server.mjs
// still need to validate incoming request!