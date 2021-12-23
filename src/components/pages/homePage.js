import React from "react";
import AuthWrapper from "../auth-wrapper/auth-wrapper";
import Home from "../home";
import NavBar from "../navbar";

function HomePage() {
    return (
        <AuthWrapper>
            <NavBar activeHeader={"Home"}/>
            <Home/>
        </AuthWrapper>
    );
};

export default HomePage;