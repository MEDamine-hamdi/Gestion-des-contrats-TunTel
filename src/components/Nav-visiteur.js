import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";
import home from '../assets/home.png';

function Navvisiteur() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

    // Sidebar styles
    const sidebarStyle = {
        width: '250px',
        height: '100vh',
        backgroundColor: '#0092ec',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'fixed', // Fixed sidebar
        left: 0,
        top: 0,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    };

    const logoStyle = {
        maxWidth: '100px',
        height: 'auto',
        marginBottom: '1rem',
        display: 'block', // Make it a block element
        marginLeft: 'auto', // Center horizontally
        marginRight: 'auto',
        marginBottom: '100px' // Spacing below the logo
    };

    const linkStyle = {
        color: '#ffffff', // Updated color
        fontWeight: '600', // Added font weight
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem', // Original padding
        borderRadius: '5px', // Existing border radius
        marginBottom: '10px', // Added margin bottom
        backgroundColor: '#1fa9ff', // Background color
        transition: 'background 0.3s', // Transition for hover effect
    };

    const homeStyle = {
        backgroundColor: '#ffffff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem', // Original padding
        borderRadius: '5px', // Existing border radius
        marginBottom: '17px',
        display: "flex", // Flexbox layout for horizontal alignment
        alignItems: "center", // Vertically align items
        justifyContent: "flex-start", // Align items to the left
    };

    const homeLStyle = {
        color: '#0092ec',
        padding: '0.5rem',
        borderRadius: '5px',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px', // Add margin to space the text from the image
    };

    const homeIStyle = {
        height: '20px',
        width: 'auto',
    };

    return (
        <div style={sidebarStyle}>
            <img src={Logo} className="img" alt="Logo" style={logoStyle} />
            
            <div style={homeStyle}>
                <img src={home} alt="Home" style={homeIStyle} />
                <Link to="home" style={homeLStyle}>Home</Link>
            </div>
            
            <Link to="Contrat-B2B" style={linkStyle}>Valider contrats B2B</Link>
            <Link to="contrats-TT" style={linkStyle}>Valider contrats espaces TT</Link>
            <Link to="chiffre-affere" style={linkStyle}>Chiffre d'affaire</Link>

            <button onClick={toggleNavbar} name="Nav" style={{ display: "none" }}>Toggle</button>
        </div>
    );
}

export default Navvisiteur;
