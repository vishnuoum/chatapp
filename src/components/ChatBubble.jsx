import "../css/ChatBubble.css"

function ChatBubble({ message }) {



    return (
        <div className={"chat-bubble" + (message.sender === "You" ? " right" : " left")}>
            <span className="msg-sender">{message.sender}</span>
            <span className="msg-text">{message.text}</span>
            <span className="msg-time">{message.time}</span>
        </div>
    )
}

export default ChatBubble