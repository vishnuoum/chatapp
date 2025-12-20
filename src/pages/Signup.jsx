import { useState } from "react";
import "../css/Form.css";
import { signup } from "../services/api";
import { useChatContext } from "../contexts/ChatContext";

function Signup() {

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { setUserId } = useChatContext()

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await signup({ username: username, phone: phone, password: password })
        console.log(result)
        if (result && result.phone) {
            setUserId(result.phone)
            console.log("setting user Id completed")
        } else {
            alert("Error while signup. Please continue later")
        }
    }
    return (
        <div className="login-form">
            <form onSubmit={handleSignup}>
                <span className="header">Signup</span>

                <input type="text" name="username" id="username" placeholder="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />

                <input type="tel" name="phone" id="phone" placeholder="Phone" maxLength="10" value={phone}
                    onChange={(e) => setPhone(e.target.value)} required />

                <input type="password" name="password" id="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />

                <input type="submit" name="submit" value="Signup" />
            </form>
        </div>
    )
}

export default Signup;