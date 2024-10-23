"use client"; 
import "../globals.css";
import React, {useState} from 'react'

export default function SideBar(){
    const [viewSideBar, setViewSideBar] = useState(true)

    function handleViewSideBar(){
        setViewSideBar((old) => !old)
    }

    return (
        // weird all around border issue
        <div className={`w-72 h-full border-r-2 border-gray-300 border-solid ${viewSideBar ? "" : "bg-red-100"}`}>

            <div className="px-5 pt-2.5 border-b-1 border-gray-300 border-solid">
                <button onClick={handleViewSideBar}>
                    <img className="w-7" src="https://www.svgrepo.com/show/506800/burger-menu.svg"></img>
                </button>
            </div>

            <button className="flex items-center px-6 py-4 w-full">
                <img className="w-6" src="https://www.svgrepo.com/show/532997/plus-large.svg"></img>
                <h3 className="pl-5">New Task</h3>
            </button>

            <button className="flex items-center px-6 py-4 w-full">
                <img className="w-6" src="https://www.svgrepo.com/show/510896/check-all.svg"></img>
                <h3 className="pl-5">Completed Tasks</h3>
            </button>

        </div>
    )
}