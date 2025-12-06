import "../css/ChatEntry.css"

function ChatEntry({ chat }) {
    return (
        <div className="chat-entry">
            <div className="chat-entry-profile-img">
                <img src="person-icon.png" />
            </div>
            <div className="chat-entry-details">
                <h3>{chat.name}</h3>
                <p>{chat.lastMsg}</p>
            </div>
            <p>{chat.time}</p>
        </div>
    )
}

export default ChatEntry;