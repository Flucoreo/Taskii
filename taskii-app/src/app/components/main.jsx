"use client";
import React, { useState, useEffect } from 'react'
import "../globals.css"

import Task from "./task"

export default function Main( {taskData , searchKey} ){

    useEffect(() => {
        console.log(searchKey);
    }, [searchKey]);

    
    let tasks = []

    // filter tasks when search box is used
    if (!searchKey){
        tasks = taskData.map((item) => (
            <Task key={item.id} {...item}/>
        )) 
    } else {
        tasks = taskData.filter((i) => checkTitleForSearch(i)).map((item) => (
            <Task key={item.id} {...item}/>
        ))
    }

    function checkTitleForSearch(task){
        let lowerTitle = task.title.toLowerCase()
        let lowerKey = searchKey.toLowerCase()
        return lowerTitle.includes(lowerKey)
    }

    return (
        <main className="bg-black flex-grow bg-gray-100 overflow-auto flex flex-wrap">
            {tasks}
        </main>
    )
}

