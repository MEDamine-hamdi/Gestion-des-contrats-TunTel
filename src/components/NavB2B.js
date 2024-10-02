import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";

function Nav() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

    const sidebarStyle = {
        width: '250px',
        height: '100vh',
        backgroundColor: '#0092ec',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
        padding: '1rem 0', // Add vertical padding
        position: 'fixed', // Fixed sidebar
        left: 0,
        top: 0,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    };

    const logoStyle = {
        maxWidth: '100px',
        height: 'auto',
        marginBottom: '2rem', // Spacing below the logo
    };

    const linksContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the links horizontally
        width: '100%',
    };

    const linkStyle = {
        color: '#ffffff', // Updated color
        fontWeight: '600', // Added font weight
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        marginBottom: '20px',
        backgroundColor: '#1fa9ff',
        textAlign: 'center', // Center text in the links
        width: '80%', // Make the links stretch across the width of the container
    };

    return (
        <div style={sidebarStyle} >
            <img src={Logo} className="img" alt="Logo" style={logoStyle} />
            <div style={linksContainerStyle}>
                <Link to="form-b2b" style={linkStyle}>Contrat B2B</Link>
                <Link to="chiffre-affere-u" style={linkStyle}>Chiffre Affaire</Link>
            </div>
        </div>
    );
}

export default Nav;
