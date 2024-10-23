import "../globals.css";

export default function Header(){
    return (

        <header className="p-3 lg:p-5">
            <h1 className="text-xl py-4 px-2">John Doe's Tasks</h1>

            <div className="flex justify-between flex-wrap">

                <div className="p-2">
                    <label htmlFor="search-bar" className="text-sm pr-2 text-gray-500">Search Tasks</label>
                    <input id="search-bar" type="search" placeholder="Search..." className="px-2 py-1 rounded-md border-1 border-black border-solid"></input>
                </div>

                {/* flex justify-between items-center */}
                <div className="">

                    <div className="p-2 inline-flex flex-wrap items-center">
                        <label className="text-sm pr-2 text-gray-500" htmlFor="sort-select">SORT BY</label>
                        <select name="Car" className="py-2 px-2 rounded-md text-sm bg-gray-200" id="sort-select">
                            <option value="">Recently modified</option>
                            <option value="">Recently added</option>
                            <option value="">Due date</option>
                            <option value="">Priority</option>
                        </select>
                    </div>

                    <div className="p-2 inline-flex flex-wrap items-center">
                        <label className="text-sm pr-2 text-gray-500" htmlFor="group-select"> GROUP BY </label>
                        <select name="Car" className="py-2 px-2 rounded-md text-sm  bg-gray-200" id="group-select">
                            <option value="">Day</option>
                            <option value="">Week</option>
                            <option value="">Group</option>
                            <option value="">Priority</option>
                        </select>
                    </div>

                </div>
                
            </div>
        </header>
    )
}