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



// get a task
app.get('/api/tasks/:id', async (request, response) => {

    const queryString = `SELECT * FROM tasks WHERE task_id = ${request.params.id}`;
    let data = [];

    try {
        const [rows, fields] = await db.promise().query(queryString);
        data = rows
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not get data from server");
    }

    return response.status(200).json(data[0])
});



// get all checklist data
app.get('/api/checklist', async (request, response) => {

    let data = [];

    try {
        const [rows, fields] = await db.promise().query("SELECT * FROM checklist");
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
    // we dont use the client values "taskObject.task_id, taskObject.dateCreated, and taskObject.dateModified"
    // because the database creates those values for us
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

    // get the checklist items from the client
    const checklistArray = [];
    if (taskObject.checklist.length >= 1){
        for (let i = 0; i < taskObject.checklist.length; i++){
            checklistArray.push(taskObject.checklist[i].value)
        }
    }

    const queryString = 
    'INSERT INTO tasks (title, notes, completed, task_group, dueDate, priority, progress, dateCreated, dateModified) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), CURRENT_DATE())';
    let result;
    let sqlTask;
    let checklistData = []

    // add the task to the sever
    try {
        // add the task
        [result] = await db.promise().query(queryString, taskArray);

        // add the task checklist 
        for (let i = 0; i < checklistArray.length; i++){
            await db.promise().query("INSERT INTO checklist (task_id, checklist_item) VALUES (?, ?)", [result.insertId, checklistArray[i]])
        }        
        
    } catch (err){
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not insert data");
    }

    // since the server adds values to task, we need to get the server's version of task to return to user
    try {
        const [rows, fields] = await db.promise().query(`SELECT * FROM tasks WHERE task_id = ?`, result.insertId);
        sqlTask = rows;

        // get the task checklist data from the server and put it into a checklist array
        const [rows2, fields2] = await db.promise().query('SELECT * FROM tasks INNER JOIN checklist ON tasks.task_id = checklist.task_id WHERE tasks.task_id = ?', result.insertId);
        for (let i = 0; i < rows2.length; i++){
            let object = {
                id: rows2[i].checklist_id,
                value: rows2[i].checklist_item
            }
            checklistData.push(object)
        }
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not return data");
    }

    // add the checklist array to the task that will be returned to the user
    sqlTask[0].checklist = checklistData;

    return response.status(201).json(sqlTask[0])
})



// patch function to mark task as completed
app.patch('/api/tasks/:id', async (request, response) => {

    try {
        await db.promise().query(`UPDATE tasks SET completed = ? WHERE task_id = ?`, [request.body.completed, request.params.id])
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not update data");
    }
    
    response.sendStatus(202);
})



// delete a task
app.delete('/api/tasks/:id', async (request, response) => {

    try {
        await db.promise().query("DELETE FROM tasks WHERE task_id = ?", [request.params.id])
    } catch (err) {
        console.log(`Express Server: ${err}`);
        return response.status(500).send("Could not delete data");
    }

    response.sendStatus(200);
})


// npx nodemon server.mjs
// still need to validate incoming request!