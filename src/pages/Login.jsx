import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import "../css/Form.css";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const { setUserId } = useChatContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login({ phone: phone, password: password })
        if (result && result.phone) {
            setUserId(result.phone)
            console.log("setting user Id completed")
            navigate('/', { replace: true })
        } else {
            alert("Error while login. Please check your username and password")
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <span className="header">Login</span>

                <input type="tel" name="phone" id="phone" placeholder="Phone" maxLength="10" value={phone}
                    onChange={(e) => setPhone(e.target.value)} required />

                <input type="password" name="password" id="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" name="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;