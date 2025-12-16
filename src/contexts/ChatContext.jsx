import { createContext, useState, useContext, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { getUsername } from "../services/api";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);
export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [chatId, setChatId] = useState(null);
    const [title, setTitle] = useState(null);
    const [groupId, setGroupId] = useState(null);
    const [chatListing, setChatListing] = useState([]);
    const [userId, setUserId] = useState(() => {
        // 👇 initialize state from storage
        return parseInt(localStorage.getItem("userId"));
    });
    const [usernameMap, setUsernameMap] = useState({});

    // keep socket in a ref to avoid stale closures and re-renders
    const socketRef = useRef(null);

    const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId");
        }
    }, [userId]);


    const addToChatListing = useCallback((chat) => {

        if (!usernameMap[chat.chat_id]) {
            getUsername(chat.chat_id).then(
                title => {
                    console.log("title " + title)
                    chat["title"] = title;
                    setUsernameMap(prev => { return { ...prev, [chat.chat_id]: title } })
                    setChatListing(prev => {
                        const filtered = prev ? prev.filter(c => c.chat_id !== chat.chat_id) : [];
                        console.log("chat " + JSON.stringify(chat));
                        console.log("fitlered " + JSON.stringify(filtered));
                        console.log([chat, ...filtered]);
                        return [chat, ...filtered];
                    });
                }
            )
        } else {
            setChatListing(prev => {
                const temp = prev.map(item =>
                    item.chat_id === chat.chat_id ? { ...item, "last_datetime": chat.last_datetime, "last_message": chat.last_message } : item
                )
                return [temp.find(item => item.chat_id === chat.chat_id), ...temp.filter(item => item.chat_id !== chat.chat_id)]
            }
            );
        }
    }, [getUsername, usernameMap, setUsernameMap]);

    const addToMessage = useCallback((message, id) => {
        setMessages(prev => {
            const prevForId = prev?.[id] ?? [];
            return { ...prev, [id]: [message, ...prevForId] };
        });

        // emit to server
        emitMessage(message, id);

        addToChatListing({ chat_id: id, title: title, last_message: message.text, type: groupId ? "group" : "individual", last_datetime: message.datetime });
    }, [addToChatListing, title, groupId]);


    const addReceivedMessage = useCallback((message, id) => {
        setMessages(prev => {
            const prevForId = prev?.[id] ?? [];
            return { ...prev, [id]: [message, ...prevForId] };
        });

        addToChatListing({
            chat_id: id,
            last_message: message.text,
            type: message.groupId ? "group" : "individual",
            last_datetime: message.datetime
        });
    }, [addToChatListing]);

    const fetchChatSummary = async (id) => {
        try {
            const response = await fetch("http://localhost:8000/getChatSummary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: id })
            });

            const data = await response.json();

            setUsernameMap(Object.fromEntries(
                data.map(item => [item.chat_id, item.title])
            ))

            if (data) {
                console.log(data)
                setChatListing(data)
            }
        } catch (e) {
            console.error("fetchChatSummary error: " + e)
        }
    }


    useEffect(() => {
        // If no userId, ensure socket is cleaned up
        if (!userId) {
            // disconnect existing socket if any
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        fetchChatSummary(userId);

        // Create socket instance and store in ref
        // set autoConnect: false so we can set auth/register before connecting if needed
        const socket = io(URL, {
            autoConnect: false,
            reconnection: true
        });

        socketRef.current = socket;

        // Optional: if you want token-based auth
        // socket.auth = { token: 'xxxxx' };

        // handlers
        const onConnect = () => {
            socket.emit("register", { "user_id": userId });
        };

        const onDisconnect = (reason) => {
            console.log("socket disconnected:", reason);
        };

        const onReceive = (data) => {
            console.log("socket received:", data);
            const sender = data.senderId ?? data.sender_id ?? data.from;
            addReceivedMessage(data, sender);
        };

        const onConnectError = (err) => {
            console.error("socket connect error:", err);
        };

        // register listeners
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("receive", onReceive);
        socket.on("connect_error", onConnectError);

        // now connect
        socket.connect();

        // cleanup when userId changes or component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.off("connect", onConnect);
                socketRef.current.off("disconnect", onDisconnect);
                socketRef.current.off("receive", onReceive);
                socketRef.current.off("connect_error", onConnectError);
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [userId]);

    const emitMessage = (message, id) => {

        const socket = socketRef.current;
        if (!socket || !socket.connected) {
            console.warn("emitMessage: socket not connected");
            return;
        }

        const payload = {
            sender_id: userId,
            receiver_id: groupId ? null : id,
            text: message?.text ?? message,
            group_id: groupId ?? null
        };


        socket.emit("send", payload)
    }

    const value = {
        messages, chatListing, chatId, title, userId, addToMessage, addToChatListing, setChatId, setUserId, setGroupId, setTitle, setMessages
    }

    return <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>

    /*
    chat event structure
    
    {
        "senderId" : "",
        "receiverId":"",
        "message": "Message",
        "time" : ""
    }
    */

}