import { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);
export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState({});
    const [chatId, setChatId] = useState("-1");
    const [title, setTitle] = useState("Person 1");
    const [chatListing, setChatListing] = useState([]);

    useEffect(() => {
        const loaded = {
            "-1": [
                { "sender": "You", "time": "16:15", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
                { "sender": "Receiver", "time": "16:14", "text": "Hello", "receiver": "You" },
                { "sender": "You", "time": "16:14", "text": "Hello", "receiver": "Person 1" },
            ]
        };
        setMessages(loaded);
    }, []);

    useEffect(() => {
        const chats = [
            { "chatId": "1", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "2", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "3", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "4", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "5", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "6", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "7", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "8", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "9", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "10", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "11", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "12", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "13", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "14", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "15", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "16", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "17", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
            { "chatId": "18", "title": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        ];
        setChatListing(chats)
    }, [])

    const addToMessage = (message) => {
        console.log(messages)
        messages[chatId] = messages[chatId] ? [message, ...messages[chatId]] : [message];
        setMessages(messages);

        addToChatListing({ "chatId": chatId, "title": title, "lastMsg": message["text"], "time": message["time"] })
    }

    const addToChatListing = (chat) => {
        const filterChat = chatListing.filter(chatList => chat.chatId !== chatList.chatId);
        // console.log(chat)
        setChatListing([chat, ...filterChat]);
        // console.log(chatListing)
    }

    const value = {
        messages, chatListing, chatId, addToMessage, addToChatListing, setChatId, title, setTitle
    }

    return <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>

    /*
    chat event structure
    
    {
        "sender":"Name",
        "senderId" : "",
        "receiver":"Name",
        "receiverId":"",
        "message": "Message",
        "time" : ""
    }
    */

}