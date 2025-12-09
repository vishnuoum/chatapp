import { createContext, useState, useContext, useEffect, useRef } from "react";
import { socket } from '../socket';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);
export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [chatId, setChatId] = useState("-1");
    const [chatListing, setChatListing] = useState([]);
    const [userId, setUserId] = useState("");

    const loadedOnce = useRef(false);

    useEffect(() => {
        if (loadedOnce.current) return;
        loadedOnce.current = true;
        var id = prompt("Please enter your id:");
        console.log(id);
        setUserId(id);
        socket.emit("register", { "userId": id });
    }, [])

    // useEffect(() => {
    //     const loaded = {
    //         "-1": [
    //             { "senderId": "Receiver", "time": "16:14", "text": "Hello", "receiverId": "You" },
    //             { "senderId": "You", "time": "16:14", "text": "Hello", "receiverId": "Person 1" },
    //         ]
    //     };
    //     setMessages(loaded);
    // }, []);

    // useEffect(() => {
    //     const chats = [
    //         { "chatId": "1", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
    //         { "chatId": "2", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
    //     ];
    //     setChatListing(chats)
    // }, [])

    const addToMessage = (message, id) => {
        setMessages(prev => {
            const prevForId = prev?.[id] ?? [];
            return {
                ...prev,
                [id]: [message, ...prevForId]
            };
        });

        emitMessage(message, id);

        addToChatListing({ chatId: id, lastMsg: message.text, time: message.time });
    }


    const addReceivedMessage = (message, id) => {
        console.log("received from " + id);

        setMessages(prev => {
            const prevForId = prev?.[id] ?? [];
            return {
                ...prev,
                [id]: [message, ...prevForId]
            };
        });

        addToChatListing({ chatId: id, lastMsg: message.text, time: message.time });
    }

    const addToChatListing = (chat) => {
        // functional update prevents stale closures and preserves previous items
        setChatListing(prev => {
            // remove any existing entry with same chatId
            const filtered = prev ? prev.filter(c => c.chatId !== chat.chatId) : [];
            return [chat, ...filtered];
        });
    }

    useEffect(() => {
        if (userId) {
            function onConnect() {
                setIsConnected(true);
            }

            function onDisconnect() {
                setIsConnected(false);
            }

            function onReceive(data) {
                console.log("Message received")
                console.log(data)
                addReceivedMessage(data, data["senderId"]);
            }

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('receive', onReceive);

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
                socket.off('receive', onReceive);
            };
        }
    }, [userId]);

    const emitMessage = (message, id) => {
        if (!userId) {
            console.warn("emitMessage: userId missing");
            return;
        }
        socket.emit("send", { "senderId": userId, "receiverId": id, "text": message["text"], "time": "15:15" })
    }

    const value = {
        messages, chatListing, chatId, addToMessage, addToChatListing, setChatId, setUserId
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