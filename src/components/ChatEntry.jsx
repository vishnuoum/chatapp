import { useChatContext } from "../contexts/ChatContext";
import "../css/ChatEntry.css"

function ChatEntry({ chat }) {
    const { setChatId, setTitle, setGroupId } = useChatContext();

    const getDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const diffDays = (n - d) / (1000 * 60 * 60 * 24);

            if (diffDays === 0) {
                return "Today";
            }

            if (diffDays === 1) {
                return "Yesterday";
            }

            if (diffDays < 7) {
                const day = date.toLocaleDateString("en-IN", { weekday: "short" }); // Mon, Tue...
                return day;
            }

            return date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        } catch (e) {
            return "-";
        }
    }

    const getTime = (dateString) => {
        try {
            return new Date(dateString).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch (e) {
            return "-"
        }
    }


    const handleOnClick = () => {
        console.log("chatEntry " + JSON.stringify(chat));
        setChatId(chat["chat_id"]);
        setTitle(chat.title);
        console.log(chat.title);
        if (chat["type"] === "group") {
            setGroupId(chat["chat_id"]);
        } else {
            setGroupId(null);
        }
    }

    return (
        <div className="chat-entry" onClick={handleOnClick} title={chat.last_message}>
            <div className="chat-entry-profile-img">
                <img src="person-icon.png" />
            </div>
            <div className="chat-entry-details">
                <h3>{chat["title"] ? chat["title"] : chat.chat_id}</h3>
                <p>{chat["last_message"] ? chat["last_message"] : "......"}</p>
            </div>
            <div className="chat-time">
                <span>{getDate(chat.last_datetime)}</span>
                <span>{getTime(chat.last_datetime)}</span>
            </div>

        </div>
    )
}

export default ChatEntry;