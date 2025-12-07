import { useState, useEffect } from "react";
import "../css/ChatWindow.css"
import ChatBubble from "./ChatBubble";
import { useChatContext } from "../contexts/ChatContext";

function ChatWindow() {

    const [textMessage, setTextMessage] = useState("")

    const { messages, addToMessage, chatId, title } = useChatContext();

    const sendMessage = (e) => {
        console.log(textMessage);
        (textMessage && textMessage.trim() !== "") && addToMessage({ "id": 1, "sender": "You", "time": "20:21", "text": textMessage, "type": "send" })
        setTextMessage("")
    }

    return (
        <div className="chat-window">
            <nav className="navbar">
                <div className='navbar-brand'>{title}</div>
            </nav>
            <div className="chat-msg-window">
                {messages[chatId]?.map(message => <ChatBubble message={message} />)}
            </div>
            <div className="chat-text-area">
                <input type="text" placeholder="Enter your message!!!" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                <button className="send" onClick={sendMessage}>&#10148;</button>
            </div>
        </div>
    )
}

export default ChatWindow;