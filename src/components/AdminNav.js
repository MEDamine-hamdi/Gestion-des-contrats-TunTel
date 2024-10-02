import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";
import home from '../assets/home.png'

function AdminNav() {
  const [showB2BPopup, setShowB2BPopup] = useState(false);
  const [showEspaceTTPopup, setShowEspaceTTPopup] = useState(false);
  const [showTTPopup, setShowTTPopup] = useState(false);

  // Inline styles
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
    marginLeft: 'auto', // Auto margins to center horizontally
    marginRight: 'auto',
    marginBottom:'100px' // Auto margins to center horizontally
};


const linkStyle = {
  color: '#ffffff', // Updated color
  fontWeight: '600', // Added font weight
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '0.5rem 1rem', // Original padding
  borderRadius: '5px', // Existing border radius
  marginBottom: '10px', // Added margin bottom
  position: 'relative',
  transition: 'background 0.3s', // Transition for hover effect
  backgroundColor: '#1fa9ff',
  marginBottom:'20px' // Added background color
};



  const popupStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '0.5rem',
    borderRadius: '5px',
    display: showB2BPopup || showEspaceTTPopup || showTTPopup ? 'block' : 'none', // Control visibility
    marginTop: '0.5rem', // Space between link and popup
    transition: 'max-height 0.3s ease-out', // Sliding transition
    overflow: 'hidden', // Prevent overflow
  };

  const popupLinkStyle = {
    color: '#0092ec',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '5px',
    display: 'block', // Make each link block-level for full-width
    fontWeight: 'bold',
    marginLeft: '18px', // Make the text bold
};

const homeStyle = {
  backgroundColor: '#ffffff',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  marginBottom: '17px',
  display: 'flex',
  alignItems: 'center',
};

const homeLStyle = {
  color: '#0092ec',
  padding: '0.5rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  marginLeft: '10px',  // Adjust the space between the icon and text
};

const homeIStyle = {
  height: '20px',
  width: 'auto',
};

  return (
    <div style={sidebarStyle}>
      <img src={Logo} className="img" alt="Logo" style={logoStyle} />
      <div style ={homeStyle}>
        <img src={home} alt="Home" style={homeIStyle}/>
        <Link to="home" style ={homeLStyle}>Home</Link>
      </div>
      <Link to="adduser" style={linkStyle}>Ajouter utilisateur</Link>
      <Link to="users" style={linkStyle}>Liste des utilisateur</Link>
      <div
        onMouseEnter={() => setShowB2BPopup(true)}
        onMouseLeave={() => setShowB2BPopup(false)}
      >
        <div style={linkStyle}>
          Contrat B2B
        </div>
        {showB2BPopup && (
          <div style={popupStyle}>
            <Link to="form-b2b" style={popupLinkStyle}>Creer Contrat B2B</Link>
            <Link to="scanner" style={popupLinkStyle}>Scanner Contrat B2B</Link>
          </div>
        )}
      </div>

      {/* Hover to show popup for Espace TT */}
      <div
        onMouseEnter={() => setShowEspaceTTPopup(true)}
        onMouseLeave={() => setShowEspaceTTPopup(false)}
      >
        <div style={linkStyle}>
          Contrat Espace TT
        </div>
        {showEspaceTTPopup && (
          <div style={popupStyle}>
            <Link to="form-espace" style={popupLinkStyle}>Creer Contrat Espace TT</Link>
            <Link to="scanner" style={popupLinkStyle}>Scanner Contrat Espace TT</Link>
          </div>
        )}
      </div>

      <Link to="contrat-B2B" style={linkStyle}>Valider contrat B2B</Link>
      <Link to="contrat-espace" style={linkStyle}>Valider contrat Espace TT</Link>

      {/* Hover to show popup for all contracts */}
      <div
        onMouseEnter={() => setShowTTPopup(true)}
        onMouseLeave={() => setShowTTPopup(false)}
      >
        <div style={linkStyle}>
          Tout les contrats 
        </div>
        {showTTPopup && (
          <div style={popupStyle}>
            <Link to="listf" style={popupLinkStyle}>Fichier PDF</Link>
            <Link to="listc" style={popupLinkStyle}>form</Link>
          </div>
        )}
      </div>

      <Link to="ajouter-type" style={linkStyle}>Ajouter une offre</Link>
      <Link to="chiffre-affere" style={linkStyle}>Chiffre affaire</Link>
    </div>
  );
}

export default AdminNav;
