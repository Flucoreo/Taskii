import "../globals.css"

export default function Task(props){

    const checklistData = props.checklist
    const checklist = checklistData.map((item) => (
        <li key={item.id}>{item.value}</li>
    ))

    return (
        <div className="bg-white w-64 p-3 m-3 shadow-md rounded-md">

            <div className="mb-2 flex items-center">
                <input type="checkbox"></input>
                <h2 className="pl-2 text-xl">{props.title}</h2>
            </div>
            
            <h3 className="my-2 px-6 py-1 rounded-md bg-indigo-600 inline-block text-white text-sm">{props.group}</h3>

            <p className="my-2 text-gray-500">{props.notes}</p>

            <ul className="my-2 text-sm text-gray-500">
                {checklist}
            </ul>

            <div className="mt-3 flex justify-between">
                <p className="text-gray-500 text-sm">{props.dueDate}</p>
                <p className="text-gray-500 text-sm">Priority: {props.priority}</p>
            </div>

        </div>
    )
}