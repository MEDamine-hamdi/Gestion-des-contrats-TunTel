import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Nav from '../components/NavB2B';
import FormB2B from '../pages/FormB2B';
import Chiffre from'../pages/Chiffre';
import Scanner from '../pages/Scanner';


function UserNav (){
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
    console.log('Logout clicked');
  };
    return(
        <div>
            <style>
                {`
                body {
                    margin: 0;
                .nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                }
                .content {
                    margin-top:8%;
                    overflowY: auto
                }
                `}
            </style>
      
      <div className="nav">
        <Nav />
      </div>
      <div className="content">
        <Routes>
          <Route path="form-b2b" element={<FormB2B />} />
          <Route path="chiffre-affere-u" element={<Chiffre />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="" element={<Chiffre />} />
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
export default UserNav;