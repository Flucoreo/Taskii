import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes'
import React, { useState, useEffect } from 'react'

export default function Modal( {onHideModal, onCreate} ){
    let currentDate = new Date().toJSON().slice(0, 10);

    const [task, setTask] = useState({

        task_id: generateRandomId(),
        title: "Untitled Task",
        notes: "",
        completed: 0,
        task_group: "",
        dueDate: "",
        priority: "Low",
        progress: "Not Started",
        dateCreated: {currentDate},
        dateModified: "",
        checklist: ""

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

        // adding a checklist to the state is a few extra steps
        if ([name] == "checklist"){
            if (checkListItem.value){
                setTask((previousData) => (
                    {
                        ...previousData,
                        checklist: [...previousData.checklist, checkListItem]
                    }
                ))

                setCheckListItem({id: "", value: "", checked: false})
            }
        } else {
            setTask((previousData) => (
                {
                    ...previousData,
                    [name]: value
                }
            ))
        }
    }

    // Add checklist functionality
    const [checkListItem, setCheckListItem] = useState({
        id: "",
        value: "",
        checked: false
    })

    function handleChecklistItemUpdate(event){
        setCheckListItem((previousData) => (
            {
                ...previousData,
                id: generateRandomId(),
                value: event.target.value
            }
        ))
    }

    let checklistItems = null;
    if (task.checklist){
        checklistItems = task.checklist.map((i) => (
            <li className="text-sm ml-2" key={i.id}>{i.value}</li>
        ))
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center flex-col'>
            
            <div>



                <div className='w-full flex justify-end'>
                    <button onClick={onHideModal} className=''>
                        <img className="w-7" src="https://www.svgrepo.com/show/521567/close-square.svg" alt="close button"></img>
                    </button>
                </div>

                <div className='overflow-auto bg-white relative'>
                    <div className='bg-white h-[85dvh] p-8'>

                        {/* task title */}
                        <input 
                            className="w-[40ch] py-3 pl-1 text-xl bg-gray-50 rounded-md" 
                            id="task-title" 
                            type="text" 
                            placeholder="Task..." 
                            name="title"
                            onChange={handleFormUpdate}
                            value={task.title}
                            required
                        ></input>

                        {/* Dates */}
                        <p className='text-sm py-3'>Created on {currentDate}</p>

                        <div className='flex gap-5'>
                            {/* task options Group*/}
                            <div className="flex flex-col py-2 flex-grow">
                                <label className="text-sm text-gray-500 py-1" htmlFor="group-drop-down">Group</label>
                                <select className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" onChange={handleFormUpdate} value={task.task_group} name="task_group" id="group-drop-down">
                                    <option>None</option>
                                    <option>Grocery</option>
                                    <option>Cleaning</option>
                                    <option>Chores</option>
                                </select>
                            </div>

                            {/* task option Priority*/}
                            <div className="flex flex-col py-2 flex-grow">
                                <label className="text-sm text-gray-500 py-1" htmlFor="priority-drop-down">Priority</label>
                                <select className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" onChange={handleFormUpdate} value={task.priority} name="priority" id="priority-drop-down">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            {/* task options progress*/}
                            <div className="flex flex-col py-2 flex-grow">
                                <label className="text-sm text-gray-500 py-1" htmlFor="progress-drop-down">Progress</label>
                                <select className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" onChange={handleFormUpdate} value={task.progress} name="progress" id="progress-drop-down">
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>

                            {/* task option Due Date*/}
                            <div className="flex flex-col py-2 flex-grow">
                                <label className="text-sm text-gray-500 py-1" htmlFor="choose-due-date">Due Date</label>
                                <input className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" onChange={handleFormUpdate} value={task.dueDate} name="dueDate" type="date" id="choose-due-date"></input>
                            </div>
                        </div>
                        

                        {/* task notes */}
                        <div className='flex flex-col'>
                            <label className="text-sm text-gray-500 py-1" htmlFor="task-notes">Notes</label>
                            <textarea className="py-2 px-2 rounded-md text-sm bg-gray-200 flex-grow" onChange={handleFormUpdate} value={task.notes} name="notes" id="task-notes"></textarea>
                        </div>

                        {/* task checklist */}
                        {/* <div className='py-2'>
                            <p className="text-sm text-gray-500 py-1" htmlFor="chose-date">Checklist</p>
                            {checklistItems}
                            <div className='my-2'>
                                <label className="text-sm text-gray-500 py-1 pr-2" htmlFor="add-item">Add item</label>
                                <input className="py-0 px-2 rounded-md text-sm border-solid border-gray-300 flex-grow" onChange={handleChecklistItemUpdate} value={checkListItem.value} type="text" id="add-item" placeholder='item..'></input>
                                <button className='text-xl px-2' name='checklist' onClick={handleFormUpdate}>+</button>
                            </div>
                        </div> */}

                        {/* create task */}
                        <button onClick={() => {onCreate(task); onHideModal()}} className="my-4 px-6 py-2 rounded-md bg-indigo-600 inline-block text-white text-sm">Create Task</button>
                    </div>

                </div>

                





            </div>

            
            
        </div>
    )
}


// set complete to erase task!
// set up edit checklist items!
// bug! Id for checklist item is upon value change, so if no value changes and you add 2 identical items their ids will be the same