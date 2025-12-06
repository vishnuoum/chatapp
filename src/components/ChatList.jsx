import "../css/ChatList.css"
import ChatEntry from "./ChatEntry";

function ChatList() {

    const chatListing = [
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 1, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 2, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
        { "id": 3, "name": "Person 1", "lastMsg": "Hello", "time": "16:15" },
    ];

    return (
        <>
            <div className="chat-list">
                <nav className="navbar">
                    <div className='navbar-brand'>Chatapp</div>
                </nav>
                <div className="chat-listing">
                    <input type="text" placeholder="&#x1F50E;&#xFE0E;    Search Chats" className="chat-list-search" id="chat-list-search" />
                    <div className="chat-entries">
                        {chatListing.map(list => <ChatEntry chat={list} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatList;