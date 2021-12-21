import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useLocation, useParams } from "react-router-dom";
import "./chat.css"

const Chat = () => {
    const {search} = useLocation();
    const username = new URLSearchParams(search).get('username');
    // console.log(username);

    // if (username === null)
    //     return (<Navigate to="/bad-request"/>)


    // const [data, setData] = useState([{}]);
    // // const chat_url = `/api/chat-history?username=${username}`;

    // useEffect(() => {
    //     fetch(`/api/chats}`).then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData(data);
    //             console.log(data);
    //         }
    //     );
    // }, []);

    // return (
    //     <div>
    //         {(typeof data.allChats === undefined) ? 
    //         (
    //             <p>Loading...</p>
    //         ) : (
    //             data.allChats.map((message, i) => (
    //             <p key={i}>{message}</p>
    //             )
    //         ))}
    //     </div>
    // );
    const [data, setData] = useState([{}]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getData(username);

        const eventSource = new EventSource("http://192.168.0.109:5000/updater");
        eventSource.onmessage = (e) => console.log(e.data);
        eventSource.addEventListener('message', function(e) {
            console.log(e.data);
          }, false);
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

    // setInterval(() => getData(username), 4000);

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