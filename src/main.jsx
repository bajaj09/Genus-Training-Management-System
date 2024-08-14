/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './App.jsx';
import Admin from './components/Admin.jsx';
import AdminNav from './components/AdminNav.jsx';
import Feedback from './components/Feedback.jsx';
import Delete from './components/Delete.jsx';
import Modify from './components/Modify.jsx';
import Attendance from './components/Attendance.jsx';
import Password from './components/Password.jsx';
import Forget from './components/Forget.jsx';
import ProtectedRoute from './ProtectedRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/:user/:id" element={<Admin />} />
        <Route path="/:user/:id/:navtitle" element={<AdminNav />} />
        <Route path="/delete/:user/:id/:userr/:idd" element={<Delete />} />
        <Route path="/modify/:user/:id/:userr/:idd" element={<Modify />} />
        <Route path="/password/:user/:id" element={<Password />} />
        <Route path="/:user/:id/:cid/:work" element={<Attendance />} />
        <Route path="/:user/:id/feedback/:cid" element={<Feedback />} />
      </Route>
    </Routes>
  </Router>
);


// "start:frontend": "npm run dev",
// "start:backend": "cd backend && nodemon server.js",
// "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\""