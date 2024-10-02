import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Nav from '../components/NavB2B';
import Bar from '../components/bar';
import FormB2B from '../pages/FormB2B';
import Chiffre from'../pages/Chiffre';


function UserNav (){
  const navigate = useNavigate();
  
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
        <Bar />
      </div>
      <div className="content">
        <Routes>
          <Route path="form-b2b" element={<FormB2B />} />
          <Route path="chiffre-affere-u" element={<Chiffre />} />
          <Route path="" element={<Chiffre />} />
        </Routes>
      </div>
      
    </div>
    );
}
export default UserNav;