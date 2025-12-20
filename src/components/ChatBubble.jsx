import { useChatContext } from "../contexts/ChatContext"
import "../css/ChatBubble.css"

function ChatBubble({ message }) {


    const { userId, usernameMap } = useChatContext();

    const getTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }





    return (
        <div className={"chat-bubble" + (message.sender_id === userId ? " right" : " left")}>
            {message.sender_id !== userId && <span className="msg-sender">{usernameMap[message.sender_id] ?? message.sender_id}</span>}
            <span className="msg-text">{message.text}</span>
            <span className="msg-time">{getTime(message.datetime)}</span>
        </div>
    )
}

export default ChatBubble