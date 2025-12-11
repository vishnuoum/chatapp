
const BASE_URL = "http://localhost:8000"

export const login = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (e) {
        console.log("Error while login")
        console.error(e);
    }
}

export const signup = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (e) {
        console.log("Error while signup")
        console.error(e);
    }
}

export const getUsername = async (phone) => {
    try {
        const response = await fetch(`${BASE_URL}/getUsername`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone: phone })
        })
        const resBody = await response.json()
        return resBody["title"]
    } catch (e) {
        console.log("Error while getUsername")
        console.error(e);
    }
}