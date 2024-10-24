"use client";
import React, { useState, useEffect } from 'react'
import Nav from "./components/nav"
import Header from "./components/header"
import SideBar from "./components/sidebar"
import Main from "./components/main"
import Modal from "./components/modal"


export default function App(){
    const [viewModal, setViewModal] = useState(false);

    return (
        <>
            <div className="h-dvh">
                <Nav />
                <div className="h-[calc(100dvh-3rem)] flex">
                    <SideBar onShowModal={() => setViewModal(true)}/>
                    <div className="w-full flex flex-col">
                        <Header />
                        <Main/>
                    </div>
                </div>
                {viewModal && <Modal onHideModal={() => setViewModal(false)}/>}
            </div>
        </>
    );
}