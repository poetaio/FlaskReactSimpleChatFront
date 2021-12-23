import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./all-chats.css";

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
        <ul className="all-chats__list">
            {(typeof data.allChats === 'undefined') ?
            (
                <p>Loading...</p>
            ) : (
                data.allChats.map((user_chat, i) => (
                    <li key={i} className="all-chats__list_item">
                        <Link className="all-chats__list-item-link" to={{
                            query: `username=${user_chat}`,
                            pathname: `/chat?username=${user_chat}`
                        }}>{user_chat}</Link>   
                    </li>
                ))
            )
        }
        </ul>
    );
}

export default AllChats;
