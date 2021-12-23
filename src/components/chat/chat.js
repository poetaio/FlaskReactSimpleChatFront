import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./chat.css"
// import { useChat } from "./useChat";
import io from "socket.io-client"

const Chat = () => {
    const {search} = useLocation();
    const username = new URLSearchParams(search).get('username');

    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState("");
    let messagesEnd = useRef(null);

    async function getData(username) {
        await fetch(`/api/chat-history?username=${username}`).then(
            res => res.json()
        ).then(
            messages => {
                setMessages(messages.chatHistory);
            }
        );
        // messagesEnd.current.scrollIntoView({ behavior: "smooth" })
        messagesEnd.current.scrollIntoView();
    }

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("");

        socketRef.current.on("connect", () => {
            socketRef.current.emit("set_connection", {with: username});
        });

        socketRef.current.on("messages", (messages) => {
            setMessages(messages);
            // messagesEnd.current.scrollIntoView({ behavior: "smooth" });
            messagesEnd.current.scrollIntoView();
        });

        getData(username);
        return () => {
            socketRef.current.emit("client_disconnect");
            socketRef.current.disconnect();
        }
    }, [username]);

    function sendMessage(e) {
        if (e.key === 'Enter' && message !== "") {
            socketRef.current.emit("message", message);
            setMessage("");
        }
    }

    return (
        <ul className="chat_history__list">
            {(messages === null) ?
            (
                <p>Loading...</p>
            ) : (
                (messages.map((user_message, i) => {
                    let className = user_message[0] === username ? "chat_history__message  chat_history__left" : "chat_history__message  chat_history__right";
                    return (<li key={i} className={className}>{user_message[1]}</li>)
                }))
            )
        }
        <input ref={messagesEnd} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/>
        {/* <input onLoad={(el) => {el.target.scrollIntoView(); messagesEnd=el.target;}} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
        {/* <input onLoad={(el) => el.target.scrollIntoView()} ref={(el) => {console.log("ele: " + el);messagesEnd = el; el.scrollIntoView({ behavior: "smooth" });}} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
        {/* <input ref={(el) => setMessagesEnd(el)} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
        </ul>
    );
}

export default Chat;