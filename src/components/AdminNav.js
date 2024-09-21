import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";

function AdminNav() {
  const [openLinks, setOpenLinks] = useState(false);
  const [showB2BPopup, setShowB2BPopup] = useState(false);
  const [showEspaceTTPopup, setShowEspaceTTPopup] = useState(false);
  const [showValidePopup, setShowValidePopup] = useState(false);
  const [showTTPopup, setShowTTPopup] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const navStyle = {
    width: "100%",
    height: "15%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#000000",
    left: 0,
    top: 0,
  };

  const leftStyle = {
    flex: 1
  };

  const logoStyle = {
    maxWidth: "110px",
    marginLeft: "10px",
    marginTop: '10px',
  };

  const rightStyle = {
    display: "flex",
    alignItems: "center",
    color: "#ffffff"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#ffffff",
    marginRight: "16px",
    fontWeight: "bold",
    position: "relative"
  };

  const popupStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    width: "200px"
  };

  const popupLinkStyle = {
    color: "#000000",
    textDecoration: "none",
    padding: "5px 0"
  };

  return (
    <div style={navStyle} className="nav">
      <div style={leftStyle}>
        <img src={Logo} className="img" alt="Logo" style={logoStyle} />
      </div>
      <div style={rightStyle}>
        <Link to="adduser" style={linkStyle}>Ajouter un utilisateur</Link>
        <Link to="users" style={linkStyle}>Liste des utilisateurs</Link>

        {/* Popup for B2B */}
        <div
          style={linkStyle}
          onMouseEnter={() => setShowB2BPopup(true)}
          onMouseLeave={() => setShowB2BPopup(false)}
        >
          Contrat B2B
          {showB2BPopup && (
            <div style={popupStyle}>
              <Link to="form-b2b" style={popupLinkStyle}>Creer Contrat B2B </Link>
              <Link to="scanner" style={popupLinkStyle}>Scanner Contrat B2B </Link>
            </div>
          )}
        </div>

        {/* Popup for Espace TT */}
        <div
          style={linkStyle}
          onMouseEnter={() => setShowEspaceTTPopup(true)}
          onMouseLeave={() => setShowEspaceTTPopup(false)}
        >
          Contrat Espace TT
          {showEspaceTTPopup && (
            <div style={popupStyle}>
              <Link to="form-espace" style={popupLinkStyle}>Creer Contrat Espace TT</Link>
              <Link to="scanner" style={popupLinkStyle}>Scanner Contrat Espace TT </Link>
            </div>
          )}
        </div>

        {/* Popup for Validate Contracts */}
        <div
          style={linkStyle}
          onMouseEnter={() => setShowValidePopup(true)}
          onMouseLeave={() => setShowValidePopup(false)}
        >
          Valider contrat 
          {showValidePopup && (
            <div style={popupStyle}>
              <Link to="contrat-B2B" style={popupLinkStyle}>B2B</Link>
              <Link to="contrat-espace" style={popupLinkStyle}>Espace TT</Link>
            </div>
          )}
        </div>

        {/* Popup for All Contracts */}
        <div
          style={linkStyle}
          onMouseEnter={() => setShowTTPopup(true)}
          onMouseLeave={() => setShowTTPopup(false)}
        >
          Tous les contrats 
          {showTTPopup && (
            <div style={popupStyle}>
              <Link to="listf" style={popupLinkStyle}>Fichier PDF</Link>
              <Link to="listc" style={popupLinkStyle}>Formulaire</Link>
            </div>
          )}
        </div>

        {/* Other Links */}
        <Link to="ajouter-type" style={linkStyle}>Ajouter une offre</Link>
        <Link to="chiffre-affere" style={linkStyle}>Chiffre d'affaires</Link>
      </div>
    </div>
  );
}

export default AdminNav;
