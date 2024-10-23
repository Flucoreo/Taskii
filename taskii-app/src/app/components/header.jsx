import "../globals.css";

export default function Header(){
    return (
        <header>
            <h1>Seth's Tasks</h1>
            <div>

                <label htmlFor="search-bar">
                    Search Tasks
                    <input id="search-bar" type="search" placeholder="Search..." className="border-1 border-black border-solid"></input>
                </label>

                <div>
                    <label>
                        SORT BY 
                        <select name="Car">
                            <option value="">Recently modified</option>
                            <option value="">Recently added</option>
                            <option value="">Due date</option>
                            <option value="">Priority</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        GROUP BY 
                        <select name="Car">
                            <option value="">Day</option>
                            <option value="">Week</option>
                            <option value="">Group</option>
                            <option value="">Priority</option>
                        </select>
                    </label>
                </div>

            </div>
        </header>
    )
}