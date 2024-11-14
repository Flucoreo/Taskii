"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Nav from "./components/nav"
import Header from "./components/header"
import SideBar from "./components/sidebar"
import Main from "./components/main"
import Modal from "./components/modal"

export default function App(){
    // state that controls the pop-up (modal) to create a task
    const [viewModal, setViewModal] = useState(false);
    // container holding all tasks
    const [taskList, setTaskList] = useState([])
    // filter states (search, filter, group by)
    const [searchKey, setSearchKey] = useState("")
    // state that displays completed or uncompleted tasks
    const [showCompleted, setShowCompleted] = useState(false)
    // temp task for updating completed value
    const [tempTask, setTempTask] = useState({})
    // error
    // const [error, setError] = useState("")

    // json server API
    const URL = "http://localhost:4000/tasks"





    // testing pulling data from express api
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:2000/api/tasks');
            console.log(response);
        };

        fetchData();
    }, []);




   
    // pull the task data from the API
    useEffect(() => {
        axios.get(URL)
            .then(response => {
                setTaskList(response.data)
                // setError("")
            })
            .catch(error => {
                console.log("Error fetching tasks")
                // setError(error)
                throw error
            })
    }, [])

    // add a task
    function addTask(taskObject){
        axios.post(URL, taskObject)
            .then((response) => {
                setTaskList((oldTasks) => [...oldTasks, {
            
                    id: response.data.id,
                    title: response.data.title,
                    notes: response.data.notes,
                    completed: response.data.completed,
                    group: response.data.group,
                    dueDate: response.data.dueDate,
                    priority: response.data.priority,
                    progress: response.data.progress,
                    dateCreated: response.data.dateCreated,
                    dateModified: response.data.dateModified,
                    checklist: response.data.checklist
                    
                }])
                // setError("")
            })
            .catch(error => {
                console.log("Error adding task")
                // setError(error)
                throw error
            })
    }

    // delete task 
    function deleteTask(id){
        axios.delete(`${URL}/${id}`)
            .then(() => {
                setTaskList((oldTasks) => oldTasks.filter(item => item.id !== id))
            })
    }

    // mark a task completed
    function completedTask(task){
        // create a copy of task so we dont mutate the state
        const taskCopy = JSON.parse(JSON.stringify(task))
        taskCopy.completed = !taskCopy.completed

        axios.put(`${URL}/${task.id}`, taskCopy)
            .then((response) => {
                setTaskList((oldTasks) => (
                    oldTasks.map((t) => (
                        t.id === task.id ? {...taskCopy} : t
                    ))
                ))
            })
    }

    return (
        <div className="h-dvh">
            <Nav />

            <div className="h-[calc(100dvh-3rem)] flex">
                <SideBar onShowModal={() => setViewModal(true)} onShowCompleted={setShowCompleted}/>
                <div className="w-full flex flex-col">
                    <Header searchKey={searchKey} setSearchKey={setSearchKey}/>
                    {/* { error && <p>Error Could not fetch tasks</p> } */}
                    {/* { !error && <Main completedTask={completedTask} taskData={taskList} searchKey={searchKey} showCompleted={showCompleted} onDelete={deleteTask}/>} */}
                    <Main completedTask={completedTask} taskData={taskList} searchKey={searchKey} showCompleted={showCompleted} onDelete={deleteTask} />
                </div>
            </div>

            {viewModal && <Modal onHideModal={() => setViewModal(false)} onCreate={addTask}/>}
        </div>
    );
}