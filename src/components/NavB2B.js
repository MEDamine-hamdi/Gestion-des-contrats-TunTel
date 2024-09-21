import React, { useState } from "react";
import Logo from '../assets/logot.png';
import { Link } from "react-router-dom";

function Nav() {
    const [openLinks, setOpenLinks] = useState(false);
    
  const [showB2BPopup, setShowB2BPopup] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

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
    return (
        <div style={navStyle} className="nav">
            <div style={leftStyle}>
                <img src={Logo} className="img" alt="Logo" style={logoStyle} />
            </div>
            <div style={rightStyle}>
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
                <Link to="chiffre-affere-u" style={linkStyle}>chiffre affaire</Link>
            </div>
        </div>
    );
}

export default Nav;
