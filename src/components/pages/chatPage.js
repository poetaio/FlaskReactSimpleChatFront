import React from "react";
import AuthWrapper from "../auth-wrapper/auth-wrapper";
import Chat from "../chat";
import NavBar from "../navbar";

function ChatPage() {
    return (
        <AuthWrapper>
            <NavBar/>
            <Chat/>
        </AuthWrapper>
    )
}

export default ChatPage;
