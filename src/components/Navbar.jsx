/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import "../styling/Navbar.css"


const Adnav = ({ tab }) => {

  const { user } = useParams();
  const { id } = useParams();
  

  const onSubmit = async (data) => {
    tab(data);
  };

  return (
    <div className="navbar">

      <div><img src="\logo.jpg" alt="" />Training Management System</div>

      <div className="working">
        <button type="button" onClick={() => onSubmit("Course")}>Dashboard</button> 
        {user == 'admin' ? <button type="button" onClick={() => onSubmit("Trainer")}>Trainer Data</button> : null}
        {user == 'admin' ? <button type="button" onClick={() => onSubmit("Trainee")}>Trainee Data</button> : null}
        {user == 'trainer' ? <button type="button" onClick={() => onSubmit("Trainer-add")}>Add Trainings</button> : null}
        {user != 'admin' ? <button type="button" onClick={() => onSubmit("Profile")}>Profile</button> : null}
        <button type="button" onClick={() => onSubmit("Logout")}>Log Out</button>
      </div>
    </div>
  );
};

export default Adnav;
