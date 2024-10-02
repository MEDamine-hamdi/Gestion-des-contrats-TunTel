import React from "react";
import Logo from '../assets/user.png'; 
import Out from '../assets/out.png';
// Inline styles
const containerStyle = {
  display: 'flex',
  backgroundColor: '#0092ec',
  padding: '10px',
  position: 'fixed',
  top: '0',
  left: '250px',
  width: 'calc(100% - 250px)',
  height: '70px',
  zIndex: 1000,
  alignItems: 'center',
  justifyContent: 'flex-end',
};

const userContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '80px',
  backgroundColor: '#1fa9ff',
  borderRadius: '5px',
  width: 'auto',
  padding: '5px',
};

const logoStyle = {
  maxWidth: '40px',
  height: 'auto',
  marginRight: '10px',
};

const profileStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
};

const usernameStyle = {
  marginBottom: '2px',
  marginRight:'5px'
};

const logoutContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: '55px',
  cursor: 'pointer',
  color: '#fff',
};

const outStyle = {
  maxWidth: '20px',
  marginRight: '5px',
};

const Navigation = () => {
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div style={containerStyle}>
      <div style={userContainerStyle}>
        <img src={Logo} className="img" alt="Logo" style={logoStyle} />
        <div style={profileStyle}>
          <div style={usernameStyle}>{userData.username}</div>
          <div>{userData.profile}</div>
        </div>
      </div>
      <div style={logoutContainerStyle} onClick={handleLogout}>
        <img src={Out} className="img" alt="Logout" style={outStyle} />
        <span>Déconnecter</span>
      </div>
    </div>
  );
};

export default Navigation;
