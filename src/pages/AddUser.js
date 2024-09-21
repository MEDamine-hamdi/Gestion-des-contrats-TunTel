import React, { useState } from "react";

function AddUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState();
    const [profile, setProfile] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, email, password, isAdmin, profile };
    
        try {
            const res = await fetch("http://192.168.64.181:3001/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    
            if (res.ok) {
                const data = await res.json();
                alert("User added successfully!");
                setUsername("");
                setEmail("");
                setPassword("");
                setIsAdmin();
                setProfile(""); 
            } else {
                const errorData = await res.text();
                alert("Failed to add user: " + errorData);
            }
        } catch (err) {
            console.error("Error adding user:", err);
            alert("Error adding user");
        }
    };
    

    const containerStyle = {
        margin: "0 auto",
        width: "28%",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const formGroupStyle = {
        marginBottom: "15px",
    };

    const labelStyle = {
        fontWeight: "bold",
        marginBottom: "5px",
        display: "block",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        width: "30%",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        alignSelf: "center",
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>
                        Admin
                        <input
                            type="checkbox"
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Profile</label>
                    <select
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="admin">Admin</option>
                        <option value="b2b-1">B2B-1</option>
                        <option value="b2b-2">B2B-2</option>
                        <option value="consultant">Consultant</option>
                        <option value="espacett-1">Espace TT-1</option>
                        <option value="espacett-2">Espace TT-2</option>
                        <option value="espacett-3">Espace TT-3</option>
                        <option value="espacett-4">Espace TT-4</option>
                        <option value="espacett-5">Espace TT-5</option>
                    </select>
                </div>
                <button type="submit" style={buttonStyle}>
                    Ajouter
                </button>
                
            </form>
        </div>
    );
}

export default AddUser;
