"use client"; 
import "../globals.css";
import React, {useState} from 'react'

export default function SideBar( {onShowModal, onShowCompleted} ){
    // true to highlight "all tasks" button false to highlight "completed tasks" button
    const [highlightButton, setHighlightButton] = useState("true")

    return (
        <div className={`w-72 h-full border-r-1 border-gray-300 border-solid`}>

            <div className="px-5 pt-2.5" style={{ borderBottom: "1px solid #D1D5DB" }}>
                <button>
                    <img className="w-7" src="https://www.svgrepo.com/show/506800/burger-menu.svg"></img>
                </button>
            </div>

            <button 
                className="flex items-center px-6 py-4 w-full" 
                onClick={() => onShowModal()}
            >
                <img className="w-6" src="https://www.svgrepo.com/show/532997/plus-large.svg"></img>
                <h3 className="pl-5">New Task</h3>
            </button>

            <button 
                className={`flex items-center px-6 py-4 w-full ${highlightButton ? "bg-gray-200 rounded-md" : ""}`}
                onClick={() => {onShowCompleted(false); setHighlightButton(true)}}
            >
                <img className="w-6" src="https://www.svgrepo.com/show/500326/all-layers.svg"></img>
                <h3 className="pl-5">All Tasks</h3>
            </button>

            <button 
                className={`flex items-center px-6 py-4 w-full ${!highlightButton ? "bg-gray-200 rounded-md" : ""}`}
                onClick={() => {onShowCompleted(true); setHighlightButton(false)}}
            >
                <img className="w-6" src="https://www.svgrepo.com/show/510896/check-all.svg"></img>
                <h3 className="pl-5">Completed Tasks</h3>
            </button>

        </div>
    )
}