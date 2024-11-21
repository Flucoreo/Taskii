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

    // express api (.env!)
    const URL = 'http://localhost:2000'


    // pulling data from express api
    useEffect(() => {
        const fetchData = async () => {
            try {
                // connect to api
                const response = await axios.get(`${URL}/api/tasks`);
                // if successful set the tasklist
                setTaskList(response.data)
            } catch (error){
                // if unsuccessful log the error
                console.log(error)
            }
        };

        fetchData();
    }, []);


    // post data to api / add a task
    function addTask(taskObject){
        axios.post(`${URL}/api/tasks`, taskObject)
            .then((response) => {
                setTaskList((oldTasks) => [...oldTasks, {
            
                    task_id: response.data.task_id,
                    title: response.data.title,
                    notes: response.data.notes,
                    completed: response.data.completed,
                    task_group: response.data.task_group,
                    dueDate: response.data.dueDate,
                    priority: response.data.priority,
                    progress: response.data.progress,
                    dateCreated: response.data.dateCreated,
                    dateModified: response.data.dateModified,
                    checklist: response.data.checklist
                    
                }])
            })
            .catch(error => {
                console.log("Error adding task")
                throw error
            })
    }

    // delete task 
    function deleteTask(task){
        axios.delete(`${URL}/api/tasks/${task.task_id}`)
            .then(() => {
                setTaskList((oldTasks) => oldTasks.filter(item => item.task_id !== task.task_id))
                console.log('delete')
            })
            .catch(error => {
                console.log("Error adding task")
                throw error
            })
    }

    // mark a task completed
    function completedTask(task){
        // create a copy of task so we dont mutate the state
        const taskCopy = JSON.parse(JSON.stringify(task));

        taskCopy.completed == 0 ? taskCopy.completed = 1 : taskCopy.completed = 0;
        
        axios.patch(`${URL}/api/tasks/${task.task_id}`, taskCopy)
            .then((response) => {
                setTaskList((oldTasks) => (
                    oldTasks.map((t) => (
                        t.task_id === task.task_id ? {...taskCopy} : t
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



// if api doesn't get data display that in UI