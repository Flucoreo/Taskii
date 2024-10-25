"use client";
import React, { useState, useEffect } from 'react'
import "../globals.css"

import Task from "./task"

export default function Main( {taskData , searchKey, completedTask, showCompleted} ){
    
    let tasks = []

    if (showCompleted){
        tasks = taskData.filter((i) => completedTasks(i)).map((item) => (
            <Task key={item.id} {...item} completedTask={completedTask}/>
        ))
    } else {
        tasks = taskData.filter((i) => filterSearchAndCompleted(i)).map((item) => (
            <Task key={item.id} {...item} completedTask={completedTask}/>
        ))
    }

    // show all the completed tasks and search through them
    function completedTasks(task){
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

