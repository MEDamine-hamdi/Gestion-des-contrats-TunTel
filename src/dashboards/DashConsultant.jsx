import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ContratTT from '../pages/ContratTT';
import ContratB2B from '../pages/ContratB2B';
import NavConsultant from '../components/Nav-visiteur';
import Chiffre from '../pages/Chiffre+';
import Home from '../pages/Home';
import Bar from '../components/bar';
import Stat from '../pages/Stat'


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
                    overflowY: auto;
                    margin-left:12%;
                }
                `}
            </style>
      
      <div className="nav">
        <NavConsultant />
        <Bar />
      </div>
      <div className="content">
        <Routes>
          <Route path="" element={<ContratTT />} />
          <Route path="contrats-TT" element={<ContratTT />} />
          <Route path="Contrat-B2B" element={<ContratB2B />} />
          <Route path="chiffre-affere" element={<Chiffre />} />
          <Route path="home" element={<Home />} />
          <Route path="stat" element={<Stat />} />
        </Routes>
      </div>
      
    </div>
    );
}
export default DashConsultant;