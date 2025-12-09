import { useChatContext } from "../contexts/ChatContext"
import "../css/ChatBubble.css"

function ChatBubble({ message }) {


    const { userId } = useChatContext();



    return (
        <div className={"chat-bubble" + (message.senderId === userId ? " right" : " left")}>
            <span className="msg-sender">{message.senderId === userId ? "You" : message.senderId}</span>
            <span className="msg-text">{message.text}</span>
            <span className="msg-time">{message.time}</span>
        </div>
    )
}

export default ChatBubble