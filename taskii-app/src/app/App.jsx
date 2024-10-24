"use client";
import React, { useState, useEffect } from 'react'

import Nav from "./components/nav"
import Header from "./components/header"
import SideBar from "./components/sidebar"
import Main from "./components/main"
import Modal from "./components/modal"

import data from "./components/data"


export default function App(){
    // state that controls the pop-up (modal) to create a task
    const [viewModal, setViewModal] = useState(false);

    // container holding all tasks
    const [taskList, setTaskList] = useState(data)

    // add a task
    function addTask(taskObject){
        setTaskList((oldTasks) => [...oldTasks, {
            
            id: taskObject.id,
            title: taskObject.title,
            notes: taskObject.notes,
            completed: taskObject.completed,
            group: taskObject.group,
            dueDate: taskObject.dueDate,
            priority: taskObject.priority,
            progress: taskObject.progress,
            dateCreated: taskObject.dateCreated,
            dateModified: taskObject.dateModified,
            checklist: taskObject.checklist
            
        }])
    }

    return (
        <div className="h-dvh">
            <Nav />

            <div className="h-[calc(100dvh-3rem)] flex">
                <SideBar onShowModal={() => setViewModal(true)}/>
                <div className="w-full flex flex-col">
                    <Header addTask={() => addTask()}/>
                    <Main taskData={taskList}/>
                </div>
            </div>

            {viewModal && <Modal onHideModal={() => setViewModal(false)}/>}
        </div>
    );
}