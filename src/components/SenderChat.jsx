function SenderChat({ message }) {
    return (
        <div className="sender-msg">
            <p className="msg-sender">{message.sender}</p>
            <p className="msg-text">{message.text}</p>
            <p className="msg-time">{message.time}</p>
        </div>
    )
}

export default SenderChat