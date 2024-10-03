import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavTT from '../components/NavTT';
import FormTT from '../pages/FormTT';
import Chiffre from '../pages/Chiffre';
import Nav from '../components/bar';

function TTNav() {
  const navigate = useNavigate();
  

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
            margin-left:10%;
          }
        `}
      </style>

      <div className="nav">
        <NavTT />
        <Nav />
      </div>
      <div className="content">
        <Routes>
          <Route path="/form-espace" element={<FormTT />} />
          <Route path="/chiffre-affere-u" element={<Chiffre />} />
          <Route path="/" element={<Chiffre />} /> {/* Updated: Route path="/" */}
        </Routes>
      </div>
    </div>
  );
}

export default TTNav;
