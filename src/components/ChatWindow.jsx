import { useEffect, useState } from "react";
import "../css/ChatWindow.css"
import ChatBubble from "./ChatBubble";
import { useChatContext } from "../contexts/ChatContext";
import { fetchHistory } from "../services/api";

function ChatWindow() {

    const [textMessage, setTextMessage] = useState("")

    const { messages, title, userId, addToMessage, setMessages, activeChat } = useChatContext();

    const sendMessage = (e) => {
        console.log(textMessage);
        (textMessage && textMessage.trim() !== "") && addToMessage({ "id": 1, "sender_id": userId, "datetime": new Date().toISOString(), "text": textMessage }, activeChat.chat_id)
        setTextMessage("")
    }


    useEffect(() => {
        if (!activeChat.chat_id) return;
        if (messages[activeChat.chat_id]) return;

        fetchHistory(userId, activeChat.chat_id, activeChat.type === "group" ? activeChat.chat_id : null).then(history => {
            setMessages(prev => ({
                ...prev,
                [activeChat.chat_id]: history
            }));
        });
    }, [activeChat]);

    return (
        <div className="chat-window">{
            !activeChat.chat_id ? <center>Tap any sender to start sending messages</center> :
                <>
                    <nav className="navbar">
                        <div className='navbar-brand'>{title}</div>
                    </nav>
                    <div className="chat-msg-window">
                        {messages[activeChat.chat_id]?.map(message => <ChatBubble message={message} />)}
                    </div>
                    <div className="chat-text-area">
                        <input type="text" placeholder="Enter your message!!!" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                        <button className="send" onClick={sendMessage}>&#10148;</button>
                    </div>
                </>
        }</div>
    )
}

export default ChatWindow;