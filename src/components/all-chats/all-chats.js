import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./all-chats.css";
import "../main/main.css";
import FindUser from "../find-user/find-user";
import Loader from "react-loader-spinner";

const AllChats = () => {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("/api/chats").then(
            res => res.json()
        ).then(
            data => {
                setData(data);
            }
        );
    }, []);
    

    return (
        <div className="all-chats">
            <h3 className="main__header">All Chats</h3>
            <FindUser/>
            <ul className="all-chats__list">
                {(typeof data.allChats === 'undefined') ?
                (
                    <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}/>
                ) : (
                    data.allChats.map((user_chat, i) => (
                        <Link className="all-chats__list-item-wrapper" to={{
                            query: `username=${user_chat}`,
                            pathname: `/chat?username=${user_chat}`
                        }}>
                            <li key={i} className="all-chats__list_item  all-chats__list-item-link">
                                {user_chat}
                            </li>
                        </Link>   
                    ))
                )
            }
            </ul>
        </div>
    );
}

export default AllChats;
