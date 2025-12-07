import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import "../css/ChatList.css"
import ChatEntry from "./ChatEntry";

function ChatList() {

    const { chatListing } = useChatContext();
    const [searchQuery, setSearchQuery] = useState("");



    return (
        <>
            <div className="chat-list">
                <nav className="navbar">
                    <div className='navbar-brand'>Chatapp</div>
                </nav>
                <div className="chat-listing">
                    <input type="text" placeholder="&#x1F50E;&#xFE0E;    Search Chats" value={searchQuery} className="chat-list-search" id="chat-list-search" onChange={(e) => setSearchQuery(e.target.value)} />
                    <div className="chat-entries">
                        {chatListing.filter(listing => listing["title"]?.startsWith(searchQuery)).map(list => <ChatEntry chat={list} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatList;