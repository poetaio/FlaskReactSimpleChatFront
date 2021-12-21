import React from "react";
import AllChats from "../all-chats";
import NavBar from "../navbar";

function AllChatsPage() {
    return (
        <div className="main-wrapper">
            <NavBar active="all_chats"/>
            <AllChats/>
        </div>
    );
}

export default AllChatsPage;
