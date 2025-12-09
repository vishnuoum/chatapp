import { useChatContext } from "../contexts/ChatContext";
import "../css/ChatEntry.css"

function ChatEntry({ chat }) {
    const { setChatId } = useChatContext();


    const handleOnClick = () => {
        console.log(chat);
        setChatId(chat["chatId"])
    }

    return (
        <div className="chat-entry" onClick={handleOnClick}>
            <div className="chat-entry-profile-img">
                <img src="person-icon.png" />
            </div>
            <div className="chat-entry-details">
                <h3>{chat.chatId}</h3>
                <p>{chat.lastMsg}</p>
            </div>
            <p>{chat.time}</p>
        </div>
    )
}

export default ChatEntry;