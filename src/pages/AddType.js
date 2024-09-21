import React, { useState } from'react';

function AddType(){
    const [Type ,setType]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOffre = { type: Type };
    
        try {
            const res = await fetch("http://192.168.64.181:3001/offre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOffre),
            });
    
            if (res.ok) {
                const data = await res.json();
                alert("Offre ajoutée avec succès!");
                setType(""); // Ensure setType is a valid state updater function
            } else {
                const errorData = await res.json(); // Use res.json() to get the error message
                alert("Failed to add offre: " + (errorData.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Error adding offre:", err);
            alert("Error adding offre: " + err.message);
        }
    };
    const containerStyle = {
        margin: "0 auto",
        width: "28%",
        padding: "40px",
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
    


    return(
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Offre</label>
                    <input
                        type="text"
                        value={Type}
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Ajouter
                </button>
            </form>
        </div>

    );
}
export default AddType;