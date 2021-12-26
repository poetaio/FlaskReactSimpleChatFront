import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./all-chats.css";
import "../main/main.css";
import FindUser from "../find-user/find-user";
import Loader from "react-loader-spinner";
import Chat from "../chat";

const AllChats = () => {
    const [allChats, setAllChats] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);

    useEffect(() => {
        fetch("/api/chats").then(
            res => res.json()
        ).then(
            allChatsRes => {
                setAllChats(allChatsRes.allChats);
            }
        );
    }, []);

    function userSelected(username) {
        if (! allChats.includes(username)) {
            allChats.push(username);
            setAllChats(allChats);
            // setAllChats();
        }

        setCurrentUsername(username);
    }
    

    return (
        <div className="all-chats">
            <h3 className="main__header">All Chats</h3>
            <div className="all-chats__chats_wrapper">
                <div className="all-chats__chats-menu">
                <FindUser userSelected={userSelected}/>
                <ul className="all-chats__list">
                    {(allChats === null) ?
                    (
                        <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}/>
                    ) : (
                        allChats.map((user_chat, i) => {
                            // <Link className="all-chats__list-item-wrapper" to={{
                            //     query: `username=${user_chat}`,
                            //     pathname: `/chat?username=${user_chat}`
                            // }}>
                            let className = user_chat === currentUsername ? "all-chats__list_item  all-chats__list-item-link  all-chats__list_item--active"
                                : "all-chats__list_item  all-chats__list-item-link";
                            return (
                            <div key={i}  onClick={() => setCurrentUsername(user_chat)}>
                                <li className={className}>
                                    {user_chat}
                                </li>
                            </div>
                            );
                            // </Link>   
                        })
                    )
                }
                </ul>
                </div>
                <div className="all-chats__chat-panel">
                    {currentUsername == null ?
                    <div>Select a chat</div> :
                    <Chat user={{username: currentUsername}}/>}
                </div>
            </div>
        </div>
    );
}

export default AllChats;
