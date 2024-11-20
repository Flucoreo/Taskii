"use client";
import React, { useState, useEffect } from 'react'
import "../globals.css"

import Task from "./task"

export default function Main( {taskData , searchKey, completedTask, showCompleted, onDelete} ){
    
    let tasks = [];

    if (showCompleted){
        tasks = taskData.filter((i) => searchCompletedTasks(i)).map((item) => (
            <Task key={item.task_id} {...item} completedTask={completedTask} onDelete={onDelete}/>
        ))
    } else {
        tasks = taskData.filter((i) => filterSearchAndCompleted(i)).map((item) => (
            <Task key={item.task_id} {...item} completedTask={completedTask} onDelete={onDelete}/>
        ))
    }

    // show all the completed tasks and search through them
    function searchCompletedTasks(task){
        let completed = task.completed
        let lowerTitle = task.title.toLowerCase()
        let lowerKey = searchKey.toLowerCase()

        return (searchKey ? lowerTitle.includes(lowerKey) : true) && completed
    }

    // show all the non completed tasks and search through them
    function filterSearchAndCompleted(task){
        let completed = !task.completed
        let lowerTitle = task.title.toLowerCase()
        let lowerKey = searchKey.toLowerCase()

        return (searchKey ? lowerTitle.includes(lowerKey) : true) && completed
    }

    return (
        <main className="bg-black flex-grow bg-gray-100 overflow-auto flex flex-wrap items-start">
            {tasks}
        </main>
    )
}

