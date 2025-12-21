import { useEffect, useState } from "react";
import "../css/ChatWindow.css"
import ChatBubble from "./ChatBubble";
import { useChatContext } from "../contexts/ChatContext";
import { addMembersToGroup, fetchHistory } from "../services/api";
import DateWidget from "./DateWidget";

function ChatWindow() {


    var widgetDatetime = null;
    const formatter = (datetime) => {
        return new Date(datetime).toLocaleDateString("en-IN", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const [textMessage, setTextMessage] = useState("")

    const { messages, title, userId, addToMessage, setMessages, activeChat } = useChatContext();

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending message", textMessage);
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


    const handleAddToGroup = () => {
        let members = prompt("Enter new group members ID seperated by ,").split(",").map(id => id.trim())
        console.log("New group members", JSON.stringify(members))
        addMembersToGroup(members, activeChat.chat_id)
    }

    const bubbleWithDate = (message, date) => {
        return (<>

            <ChatBubble message={message} />
            <DateWidget date={date} />
        </>);
    }



    return (
        <div className="chat-window">{
            !activeChat.chat_id ? <center>Tap any sender to start sending messages</center> :
                <>
                    <nav className="navbar">
                        <div className='navbar-brand'>{title}</div>
                        {activeChat.type === "group" && <button className="navbar-button add-to-group" onClick={handleAddToGroup}>Add member +</button>}
                    </nav>
                    <div className="chat-msg-window">
                        {messages[activeChat.chat_id]?.map((message, index) => {
                            const formattedDate = formatter(message.datetime);
                            console.log(formattedDate)


                            if (!widgetDatetime) {
                                widgetDatetime = formattedDate;
                                if (index == messages[activeChat.chat_id].length - 1) {
                                    return bubbleWithDate(message, widgetDatetime);
                                }
                                return <ChatBubble message={message} />
                            }

                            if (widgetDatetime !== formattedDate) {
                                let temp = widgetDatetime;
                                widgetDatetime = formattedDate;
                                return bubbleWithDate(message, temp);
                            } else {
                                if (index == messages[activeChat.chat_id].length - 1) {
                                    return bubbleWithDate(message, widgetDatetime);
                                }
                                return <ChatBubble message={message} />
                            }


                        }
                        )}
                    </div>
                    <form className="chat-text-area" onSubmit={sendMessage}>
                        <input type="text" placeholder="Enter your message!!!" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                        <button className="send" onClick={sendMessage}>&#10148;</button>
                    </form>
                </>
        }</div>
    )
}

export default ChatWindow;