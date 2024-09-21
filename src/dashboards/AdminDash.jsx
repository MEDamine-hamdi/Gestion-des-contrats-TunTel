import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';
import FormTT from '../pages/FormTT';
import FormB2B from '../pages/FormB2B';
import AddUser from '../pages/AddUser';
import Users from '../pages/Users';
import ContratTT from '../pages/ContratTT';
import ContratB2B from '../pages/ContratB2B';
import Offre from '../pages/AddType';
import Chiffre from '../pages/Chiffre+';
import Home from '../pages/Home';
import Scanner from '../pages/Scanner';
import List from '../pages/List';
import Listc from '../pages/ListC';
function AdminDash() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
    console.log('Logout clicked');
  };

  const handleHome = () => {
    navigate('home');
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
          }
          .content::-webkit-scrollbar {
            display: none; /* Hide scrollbar for Chrome, Safari and Opera */
          }
        `}
      </style>
      <div className='nav'>
        <AdminNav />
      </div>
      <div className='content'>
        <Routes>
          <Route path="form-espace" element={<FormTT />} />
          <Route path="form-b2b" element={<FormB2B />} />
          <Route path="home" element={<Home />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="users" element={<Users />} />
          <Route path="contrat-espace" element={<ContratTT />} />
          <Route path="contrat-B2B" element={<ContratB2B />} />
          <Route path="ajouter-type" element={<Offre />} />
          <Route path="chiffre-affere" element={<Chiffre />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="listf" element={<List />} />
          <Route path="listc" element={<Listc />} />
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
            margin: '10px auto',
            display: 'block',
          }}
        >
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
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default AdminDash;
