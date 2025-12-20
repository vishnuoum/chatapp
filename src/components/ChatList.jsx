import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import "../css/ChatList.css"
import ChatEntry from "./ChatEntry";
import { createGroup } from "../services/api";

function ChatList() {

    const { userId, chatListing, addToChatListing } = useChatContext();
    const [searchQuery, setSearchQuery] = useState("");

    const handleNewChat = () => {
        let receiverId = prompt("Enter receiver ID")
        addToChatListing({ "chat_id": receiverId, "last_message": "....", "last_datetime": new Date().toISOString(), "type": "individual" })
    }

    const handleNewGroup = async () => {
        let groupName = prompt("Enter group name")
        let members = prompt("Enter group members ID seperated by ,").split(",").map(id => id.trim())
        members.push(userId)
        console.log("Group members", JSON.stringify(members))
        const groupId = await createGroup(members, userId, groupName)
        if (!groupId) {
            alert("Error creating group")
        }
    }



    return (
        <>
            <div className="chat-list">
                <nav className="navbar">
                    <div className='navbar-brand'>Chatapp</div>
                    <div>
                        <button className="navbar-button chat-button" onClick={handleNewChat}>Chat +</button>
                        <button className="navbar-button group-button" onClick={handleNewGroup}>Group +</button>
                    </div>
                </nav>
                <div className="chat-listing">
                    <input type="text" placeholder="&#x1F50E;&#xFE0E;    Search Chats" value={searchQuery} className="chat-list-search" id="chat-list-search" onChange={(e) => setSearchQuery(e.target.value)} />
                    <div className="chat-entries">
                        {chatListing && chatListing.length === 0 ? <center>no messages</center> : chatListing.filter(listing => {
                            const title = listing["title"] ? listing["title"] : String(listing["chat_id"])
                            return title.startsWith(searchQuery) || String(listing["chat_id"]).startsWith(searchQuery)
                        }).map(list => <ChatEntry chat={list} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatList;