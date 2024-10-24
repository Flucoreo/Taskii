import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes'
import React, { useState, useEffect } from 'react'

export default function Modal( {onHideModal} ){
    let currentDate = new Date().toJSON().slice(0, 10);

    const [task, setTask] = useState({

        id: generateRandomId(),
        title: "",
        notes: "",
        completed: false,
        group: "",
        dueDate: "",
        priority: "low",
        progress: "Not Started",
        dateCreated: {currentDate},
        dateModified: "",
        checklist: []

    })

    // create a random ID for the task
    function generateRandomId() {
        const length = 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

    // create a task
    function handleFormUpdate(event){
        const {name, value} = event.target

        setTask((previousData) => (
            {
                ...previousData,
                [name]: value
            }
        ))

        console.log(task)
    }
    

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center overflow-auto'>
            <div>
                <button onClick={onHideModal}>
                    <img className="w-7 ml-64" src="https://www.svgrepo.com/show/521567/close-square.svg" alt="close button"></img>
                </button>

                <div className='bg-white h-[85dvh] p-8'>

                    {/* task title */}
                    <input 
                        className="w-[40ch] py-3 text-xl" 
                        id="task-title" 
                        type="text" 
                        placeholder="Task..." 
                        name="title"
                        onChange={handleFormUpdate}
                        value={task.title}
                    ></input>

                    {/* Dates */}
                    <p className='text-sm py-3'>Created on {currentDate}</p>

                    {/* task options */}
                    <div className='flex gap-5'>
                        <Dropdown label="Group" data={["Grocery", "Cleaning", "Chores"]}/>
                        <Dropdown label="Priority" data={["Low", "Medium", "High", "Urgent"]}/>
                    </div>
                    <div className='flex gap-5'>
                        <Dropdown label="Progress" data={["Not Started", "In Progress", "Completed"]}/>
                        <Callendar />
                    </div>

                    {/* task notes */}
                    <TextArea />
                    <button className="my-4 px-6 py-2 rounded-md bg-indigo-600 inline-block text-white text-sm">Create Task</button>
                    {/* <Checklist list={list} onAdd={() => addItemToList()}/> */}

                </div>

            </div>
        </div>
    )
}



function Dropdown({label, data}){
    const options = data.map((item) => (
        // make unique keys!
        <option key={item} value={item}>{item}</option>
    ))

    return (
        <div className="flex flex-col py-2 flex-grow">
            <label className="text-sm text-gray-500 py-1" htmlFor={label}>{label}</label>
            <select name="drop down" className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" id={label}>
                {options}
            </select>
        </div>
    )
}

function TextArea(){
    return (
        <div className='flex flex-col'>
            <label className="text-sm text-gray-500 py-1" htmlFor="notes">Notes</label>
            <textarea id="notes" className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow"></textarea>
        </div>
    )
}

function Callendar(){
    return (
        <div className="flex flex-col py-2 flex-grow">
            <label className="text-sm text-gray-500 py-1" htmlFor="chose-date">Due Date</label>
            <input className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" type="date" id="choose-date"></input>
        </div>
    )
}

// function Checklist( {list, onAdd} ){
//     const [checkboxData, setCheckBoxData] = useState("")

//     function handleChange(event) {
//         setCheckBoxData(() => {
//             return event.target.value
//         })
//     }

//     let checklist = list.map((item) => (
//         <li key={item.key}>{item.value}</li>
//     ))

//     return (
//         <div className='py-2'>
//             <p className="text-sm text-gray-500 py-1" htmlFor="chose-date">Checklist</p>
//             <ul>
//                 {checklist}
//             </ul>
//             <div className='my-2'>
//                 <label className="text-sm text-gray-500 py-1 pr-2" htmlFor="add-item">Add item</label>
//                 <input className="py-0 px-2 rounded-md text-sm border-solid border-gray-300 flex-grow" type="text" id="add-item" placeholder='item..' onChange={handleChange} value={checkboxData}></input>
//                 <button className='text-xl px-2' onClick={() => onAdd(checkboxData)}>+</button>
//             </div>
//         </div>
//     )
// }


// set complete to erase task!