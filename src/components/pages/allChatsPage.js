import React from "react";
import AllChats from "../all-chats";
import AuthWrapper from "../auth-wrapper/auth-wrapper";
import NavBar from "../navbar";

function AllChatsPage() {
    return (
        <AuthWrapper>
            <NavBar activeHeader={"Chats"}/>
            <AllChats/>
        </AuthWrapper>
    );
}

export default AllChatsPage;
