import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logot.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://192.168.0.200:3001/login', { username, password });

            if (res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data

                if (res.data.user.isAdmin) {
                    toast.success('Connexion réussie. Vous êtes administrateur.');
                    navigate('/admin');
                } else if (res.data.user.profile === 'consultant') {
                    toast.success('Connexion réussie. Vous êtes consultant.');
                    navigate('/visitor');
                } else if (res.data.user.profile === 'espacett-1'|| res.data.user.profile === 'espacett-2'||
  res.data.user.profile === 'espacett-3' || 
  res.data.user.profile === 'espacett-4' || 
  res.data.user.profile === 'espacett-5') {
                    toast.success('Connexion réussie.');
                    navigate('/userTT');
                }
                else
                {
                    navigate('/userB2B')
                }
            } else {
                toast.error('Utilisateur non trouvé.');
            }
        } catch (error) {
            toast.error('Identifiants incorrects');
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
        marginTop: '3%'
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

    const logoStyle = {
        maxWidth: "110px",
        margin: "10px auto",
    };

    return (
        <div style={containerStyle}>
            <div style={logoStyle}>
                <img src={Logo} className="img" alt="Logo" style={logoStyle} />
            </div>
            <h2 style={{ textAlign: "center" }}>Connexion</h2>
            <div style={formStyle}>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="username">Nom d'utilisateur</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <button onClick={handleLogin} style={buttonStyle}>Connexion</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
