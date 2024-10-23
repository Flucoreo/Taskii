import Nav from "./components/nav"
import Header from "./components/header"
import SideBar from "./components/sidebar"
import Main from "./components/main"

export default function App(){
    return (
        <div className="h-dvh">
            <Nav />
            <div className="h-[calc(100dvh-3rem)] flex">
                <SideBar />
                <div className="w-full flex flex-col">
                    <Header />
                    <Main />
                </div>
            </div>
        </div>
    );
}