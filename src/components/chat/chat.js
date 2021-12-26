import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import "./chat.css"
// import { useChat } from "./useChat";
import io from "socket.io-client"
import Loader from "react-loader-spinner";

const Chat = (props) => {
    // const {search} = useLocation();
    // const username = new URLSearchParams(search).get('username');
    const { username } = props.user;

    const [messages, setMessages] = useState([]);
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
        if (messagesEnd.current != null)
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
            if (messagesEnd.current != null)
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
        <div className="chat_history__username-list-wrapper">
            <div className="chat_history__username">{username}</div>
            <div className="chat_history__list_wrapper">
                <ul className="chat_history__list">
                    {(messages === null) ?
                    (
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000}/>
                    ) : (
                        (messages.map((user_message, i) => {
                            let className = user_message[0] === username ? "chat_history__message  chat_history__left" : "chat_history__message  chat_history__right";
                            return (<li ref={i < messages.length - 1 ? messagesEnd : null} key={i} className={className}>{user_message[1]}</li>)
                        }))
                    )
                }
                {/* <input onLoad={(el) => {el.target.scrollIntoView(); messagesEnd=el.target;}} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
                {/* <input onLoad={(el) => el.target.scrollIntoView()} ref={(el) => {console.log("ele: " + el);messagesEnd = el; el.scrollIntoView({ behavior: "smooth" });}} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
                {/* <input ref={(el) => setMessagesEnd(el)} type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/> */}
                </ul>
            </div>
            <input type="text" value={message} onKeyPress={e => sendMessage(e)} onChange={(e) => setMessage(e.target.value)} className="chat_history__input"/>

        </div>
    );
}

export default Chat;