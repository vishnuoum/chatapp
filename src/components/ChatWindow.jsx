import "../css/ChatWindow.css"
import SenderChat from "./SenderChat";

function ChatWindow() {

    const messages = [
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
        { "id": 1, "sender": "Sender", "time": "16:14", "text": "Hello" },
    ]
    return (
        <div className="chat-window">
            <nav className="navbar">
                <div className='navbar-brand'>Chatapp</div>
            </nav>
            <div className="chat-msg-window">
                {messages.map(message => <SenderChat message={message} />)}
            </div>
            <div className="chat-text-area">
                <input type="text" placeholder="Enter your message!!!" />
                <button className="send">&#10148;</button>
            </div>
        </div>
    )
}

export default ChatWindow;