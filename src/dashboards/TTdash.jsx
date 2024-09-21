import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavTT from '../components/NavTT';
import FormTT from '../pages/FormTT';
import Chiffre from '../pages/Chiffre';
import Scanner from '../pages/Scanner';

function TTNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
    console.log('Logout clicked');
  };

  return (
    <div>
      <style>
        {`
          body {
            margin: 0;
          }
          .nav {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
          }
          .content {
            margin-top: 8%;
            overflow-y: auto; /* Corrected: Use camelCase for CSS properties */
          }
        `}
      </style>

      <div className="nav">
        <NavTT />
      </div>
      <div className="content">
        <Routes>
          <Route path="/form-espace" element={<FormTT />} />
          <Route path="/chiffre-affere-u" element={<Chiffre />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="/" element={<Chiffre />} /> {/* Updated: Route path="/" */}
        </Routes>
      </div>
      <div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px auto', // Center horizontally with margin auto
            display: 'block', // Ensures it takes full width available
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TTNav;
