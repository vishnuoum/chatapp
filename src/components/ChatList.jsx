import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import "../css/ChatList.css"
import ChatEntry from "./ChatEntry";

function ChatList() {

    const { chatListing, addToChatListing } = useChatContext();
    const [searchQuery, setSearchQuery] = useState("");

    const handleNewChat = () => {
        let receiverId = prompt("Enter receiver ID")
        addToChatListing({ "chatId": receiverId, "lastMsg": "", "time": "" })
    }



    return (
        <>
            <div className="chat-list">
                <nav className="navbar">
                    <div className='navbar-brand'>Chatapp</div>
                    <button className="navbar-button" onClick={handleNewChat}>New Chat +</button>
                </nav>
                <div className="chat-listing">
                    <input type="text" placeholder="&#x1F50E;&#xFE0E;    Search Chats" value={searchQuery} className="chat-list-search" id="chat-list-search" onChange={(e) => setSearchQuery(e.target.value)} />
                    <div className="chat-entries">
                        {chatListing && chatListing.length === 0 ? <center>no messages</center> : chatListing.filter(listing => listing["chatId"]?.startsWith(searchQuery)).map(list => <ChatEntry chat={list} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatList;