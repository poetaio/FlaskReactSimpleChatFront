import React from "react";
import "../main/main.css";
import "./home.css";

function Home() {
    return (
            <div className="home">
                <h3 className="main__header">Home, sweet home</h3> 
                <div className="home__text">
                    It's a simple chat app developed with Flask and React. Both backend and frontend use socketio.
                </div>
            </div>
    );
};

export default Home;
