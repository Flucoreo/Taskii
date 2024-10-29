import "../globals.css"
import React, { useState } from 'react'

export default function Task(props){
    const [isHover, setIsHover] = useState(false)

    const checklistData = props.checklist
    const checklist = checklistData.map((item) => (
        <li key={item.id}>{item.value}</li>
    ))

    {/* task display if it has been completed */}
    const cover = (<div className='absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center flex-col'>
                <div className="flex flex-col items-center">
                    <button onClick={() => props.completedTask(props)} className="my-2 px-6 py-2 rounded-md bg-emerald-600 inline-block text-white text-sm">Restore</button>
                    <button onClick={() => props.onDelete(props.id)} className="my-2 px-6 py-2 rounded-md bg-red-500 inline-block text-white text-sm">Delete</button>
                </div>
            </div>)


    return (
        <div className="relative bg-white w-64 p-3 m-3 shadow-md rounded-md" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

            {/* Display task */}
            <div className="mb-2 flex items-center">
                <input type="checkbox" onChange={() => props.completedTask(props)}></input>
                <h2 className="pl-2 text-xl">{props.title}</h2>
            </div>
            
            <h3 className="my-2 px-6 py-1 rounded-md bg-indigo-600 inline-block text-white text-sm">{props.group}</h3>

            <p className="my-2 text-gray-500">{props.notes}</p>

            <ul className="my-2 text-sm text-gray-500">
                {checklist}
            </ul>

            <div className="mt-3 flex justify-between">
                <p className="text-gray-500 text-sm">{props.dueDate ? "Due: " + props.dueDate : "No due date"}</p>
                <p className="text-gray-500 text-sm">Priority: {props.priority}</p>
            </div>

            {/* task display if it has been completed */}
            {(props.completed && isHover) && cover}
            
        </div>
    )
}