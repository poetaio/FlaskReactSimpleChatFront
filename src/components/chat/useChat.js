import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";


export const useChat = () => {

    const [messages, setMessages] = useState([]);

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("/api/socket_connection", {
            query: {}
        });

        socketRef.current.emit('users:init', {
            userFrom: "",
            userTo: ""
        });
    });

    socketRef.current.on('messages', (messages) => {
        setMessages(messages);
    });

    const sendMessage = (messageText) => {
        socketRef.current.emit('message:add', messageText);
    };

    return { messages, sendMessage };
};
