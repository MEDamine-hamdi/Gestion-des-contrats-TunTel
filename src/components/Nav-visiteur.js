import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";

function Navvisiteur() {
    const [openLinks, setOpenLinks] = useState(false);
    const [showTTPopup, setShowTTPopup] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }
    const popupStyle = {
      position: "absolute",
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
    const navStyle = {
        width: "100%",
        height: "15%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000000",
        marginBottom: "2%",
        left:0,
        top:0,
    };
    
    
      const leftStyle = {
        flex: 1
      };
    
      const logoStyle = {
        maxWidth: "110px",
        marginLeft:"10px",
        marginTop:'10px',
      };
    
      const rightStyle = {
        display: "flex",
        alignItems: "center",
        color: "#ffffff"
      };
    
      const linkStyle = {
        textDecoration: "none",
        color: "#ffffff",
        marginRight: "20px",
        fontWeight: "bold"
      };
      const navScrollbarStyle = {
        scrollbarWidth: "none", /* Firefox */
        msOverflowStyle: "none",  /* IE and Edge */
    };

    return (
        <div style={navStyle}>
            <div style={leftStyle}>
                <img src={Logo} className="img" alt="Logo" style={logoStyle} />
            </div>
            <div style={rightStyle}>
                <Link to="Contrat-B2B" style={linkStyle}>Valider contrats b2b</Link>
                <Link to="contrats-TT" style={linkStyle}>Valider contrats espaces tt</Link>
                <Link to="chiffre-affere" style={linkStyle}>chiffre affaire</Link>
                <div
          style={linkStyle}
          onMouseEnter={() => setShowTTPopup(true)}
          onMouseLeave={() => setShowTTPopup(false)}
        >
          Tout les contrat 
          {showTTPopup && (
            <div style={popupStyle}>
              <Link to="listf" style={popupLinkStyle}>Fichier PDF</Link>
              <Link to="listc" style={popupLinkStyle}>form</Link>
            </div>
          )}
        </div>
                <button onClick={toggleNavbar} name="Nav" style={{ display: "none" }}>Toggle</button>
            </div>
        </div>
    );
}

export default Navvisiteur;
