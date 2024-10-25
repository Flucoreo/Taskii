"use client";
import React, { useState, useEffect } from 'react'
import "../globals.css"

import Task from "./task"

export default function Main( {taskData , searchKey, completedTask} ){
    
    let tasks = []

    tasks = taskData.filter((i) => filterSearchAndCompleted(i)).map((item) => (
        <Task key={item.id} {...item} completedTask={completedTask}/>
    ))

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

