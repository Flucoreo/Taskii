import "../globals.css";

export default function Header( {searchKey, setSearchKey} ){

    return (

        <header className="p-3 lg:p-3 w-full">
            <h1 className="text-xl py-4 px-2">Your Tasks:</h1>

            <div className="flex justify-between flex-wrap">

                {/* SEARCH BAR */}
                <div className="p-2">
                    <label htmlFor="search-bar" className="text-sm pr-2 text-gray-500">Search Tasks</label>
                    <input onChange={(e) => setSearchKey(e.target.value)} value={searchKey} id="search-bar" type="search" placeholder="Search..." className="px-2 py-1 rounded-md border-1 border-black border-solid"></input>
                </div>

                <div className="">

                    {/* SORT BY DROP DOWN */}
                    <div className="p-2 inline-flex flex-wrap items-center">
                        <label className="text-sm pr-2 text-gray-500" htmlFor="sort-select">SORT BY</label>
                        <select name="Car" className="py-2 px-2 rounded-md text-sm bg-gray-200" id="sort-select">
                            <option value="">Recently added</option>
                            <option value="">Recently modified</option>
                            <option value="">Due date</option>
                            <option value="">Priority</option>
                        </select>
                    </div>

                    {/* GROUP BY DROP DOWN */}
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