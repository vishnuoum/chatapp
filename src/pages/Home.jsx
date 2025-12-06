import { Link } from 'react-router-dom';
import "../css/Home.css"
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

function Home() {
    return (
        <div className='container'>
            <ChatList />
            <ChatWindow />
        </div>
    )
}

export default Home;