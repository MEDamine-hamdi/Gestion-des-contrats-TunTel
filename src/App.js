import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDash from './dashboards/AdminDash';
import B2BDash from './dashboards/B2Bdash';
import Dashtt from './dashboards/TTdash';
import VisitorDash from './dashboards/DashConsultant'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin/*" element={<AdminDash />} />
        <Route path="/userTT/*" element={<Dashtt />} />
        <Route path="/userB2B/*" element={<B2BDash />} />
        <Route path="/visitor/*" element={<VisitorDash />} />
      </Routes>
    </Router>
  );}



export default App;
