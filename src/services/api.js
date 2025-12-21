
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

export const getGroupName = async (group_id) => {
    try {
        const response = await fetch(`${BASE_URL}/getGroupName`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ group_id: group_id })
        })
        const resBody = await response.json()
        return resBody["title"]
    } catch (e) {
        console.log("Error while getUsername")
        console.error(e);
    }
}

export const fetchHistory = async (user_id, chat_id, group_id) => {
    try {
        const response = await fetch(`${BASE_URL}/getMessages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user_id, chat_id: chat_id, group_id: group_id })
        })
        const resBody = await response.json()
        return resBody
    } catch (e) {
        console.log("Error while getUsername")
        return []
    }
}

export const createGroup = async (members, userId, name) => {
    try {
        const response = await fetch(`${BASE_URL}/createGroup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: userId, name: name, members: members })
        })
        const resBody = await response.json()
        return resBody.group_id
    } catch (e) {
        console.log("Error while creating group")
        return null;
    }
}

export const addMembersToGroup = async (members, groupId) => {
    try {
        const response = await fetch(`${BASE_URL}/addMembersToGroup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ group_id: groupId, members: members })
        })
    } catch (e) {
        console.log("Error while adding new members to group")
        alert("Error while adding new members to group")
    }
}