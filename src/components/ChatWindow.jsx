import { useEffect, useState } from "react";
import "../css/ChatWindow.css"
import ChatBubble from "./ChatBubble";
import { useChatContext } from "../contexts/ChatContext";
import { fetchHistory } from "../services/api";

function ChatWindow() {

    const [textMessage, setTextMessage] = useState("")

    const { messages, title, userId, groupId, addToMessage, chatId, setMessages } = useChatContext();

    const sendMessage = (e) => {
        console.log(textMessage);
        (textMessage && textMessage.trim() !== "") && addToMessage({ "id": 1, "sender_id": userId, "datetime": new Date().toISOString(), "text": textMessage }, chatId)
        setTextMessage("")
    }


    useEffect(() => {
        if (!chatId || messages[chatId]) return;

        const loadMessages = async () => {
            const history = await fetchHistory(userId, chatId, groupId);

            setMessages(prev => ({
                ...prev,
                [chatId]: history
            }));
        };

        loadMessages();
    }, [chatId]);

    return (
        <div className="chat-window">{
            !chatId ? <center>Tap any sender to start sending messages</center> :
                <>
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
                </>
        }</div>
    )
}

export default ChatWindow;