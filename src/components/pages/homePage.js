import React from "react";
import Home from "../home";
import NavBar from "../navbar";

function HomePage() {
    return (
        <div className="main-wrapper">
            <NavBar/>
            <Home/>
        </div>
    );
};

export default HomePage;