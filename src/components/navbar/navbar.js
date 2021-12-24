import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ activeHeader }) {
    const [redirect, setRedirect] = useState(false);
    function logout(){
        fetch("/api/logout").then(
            setRedirect(true)
        );
    }

    function makeNavbarHeader(name, path, active) {
        return {
            name: name,
            path: path,
            linkClass: active ? "nav-link active" : "nav-link",
            liClass: active ? "nav-item active" : "nav-item"
        };
    }

    const navbarHeaders = [
        makeNavbarHeader("Home", "/", activeHeader === "Home"),
        makeNavbarHeader("Chats", "/chats", activeHeader === "Chats"),
        makeNavbarHeader("Profile", "/profile", activeHeader === "Profile"),
        // makeNavbarHeader("Home", "/", )
    ];

    return (
        (redirect) ?
        <Navigate to="/login"/> :
        <div className="navclass   navbar navbar-expand-md navbar-light bg-light">
            <Link className="navbar-brand" to="/">Simple Chat</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {navbarHeaders.map((item, key) => (
                    <li  key={key} className={item.liClass}>
                        <Link className={item.linkClass} to={item.path}>{item.name}</Link>
                    </li>
                ))}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li> */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/chats">Chats</Link>
                </li> */}
                {/* <li className="nav-item">
                    <Link className="nav-link disabled" href="#">Disabled</Link>
                </li> */}
                </ul>
            </div>
            <button onClick={logout} className="btn  btn-primary">Log out</button>
        </div>
    );
}

export default NavBar;
