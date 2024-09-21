import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ContratTT from '../pages/ContratTT';
import ContratB2B from '../pages/ContratB2B';
import NavConsultant from '../components/Nav-visiteur';
import Chiffre from '../pages/Chiffre+';
import Home from '../pages/Home';
import List from '../pages/List';
import Listc from '../pages/ListC';


function DashConsultant(){
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
    console.log('Logout clicked');
  };
  const handleHome = () => {
    navigate('home');
  };
    return(
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
                    top:0;
                    width:100%;
                }
                .content {
                    margin-top:8%;
                    overflowY: auto
                }
                `}
            </style>
      
      <div className="nav">
        <NavConsultant />
      </div>
      <div className="content">
        <Routes>
          <Route path="" element={<ContratTT />} />
          <Route path="contrats-TT" element={<ContratTT />} />
          <Route path="Contrat-B2B" element={<ContratB2B />} />
          <Route path="chiffre-affere" element={<Chiffre />} />
          <Route path="listf" element={<List />} />
          <Route path="listc" element={<Listc />} />
          <Route path="home" element={<Home />} />
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
          }}>
          Logout
        </button>
        <button
          onClick={handleHome}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px auto',
            display: 'block',
          }}>
          Home
        </button>
      </div>
    </div>
    );
}
export default DashConsultant;