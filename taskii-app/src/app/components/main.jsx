"use client";
import React, { useState, useEffect } from 'react'
import "../globals.css"

import Task from "./task"

export default function Main( {taskData} ){
    
    const tasks = taskData.map((item) => (
        <Task key={item.id} {...item}/>
    ))

    return (
        <main className="bg-black flex-grow bg-gray-100 overflow-auto flex flex-wrap">
            {tasks}
        </main>
    )
}

