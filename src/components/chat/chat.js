import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./chat.css"

const Chat = () => {
    const {search} = useLocation();
    const username = new URLSearchParams(search).get('username');

    const [data, setData] = useState([{}]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getData(username);
    }, [username]);

    function sendMessage(e) {
        if (e.key === 'Enter' && message !== "") {
            fetch(`/api/chat-history?username=${username}&message=${message}`, {method: "POST"});
            setMessage("");
            getData(username);
        }
    }

    function getData(username) {
        fetch(`/api/chat-history?username=${username}`).then(
            res => res.json()
        ).then(
            data => {
                setData(data);
            }
        );
    }

    return (
        <ul className="chat_history__list">
            {(typeof data.chatHistory === 'undefined') ?
            (
                <p>Loading...</p>
            ) : (
                (data.chatHistory.map((user_message, i) => {
                    let className = user_message[0] === username ? "chat_history__message  chat_history__left" : "chat_history__message  chat_history__right";
                    return (<li key={i} className={className}>{user_message[1]}</li>)
                }))
            )
        }
        <input type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/>
        </ul>
    );
}

export default Chat;