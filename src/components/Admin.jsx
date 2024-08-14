/* eslint-disable no-unused-vars */
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import React from 'react'
import { useForm } from "react-hook-form"

import Navbar from './Navbar.jsx'
import Course from './Course.jsx'
import Profile from './Profile.jsx'
import Courseadd from './Courseadd.jsx'

function Admin() {
  
  const { user } = useParams();
  const { id } = useParams();
  const [option, setData] = useState("");
  const tab = (childData) => { setData(childData) };
  const navigate = useNavigate();

  useEffect(() => {
  }, [option])

  if (option == 'Logout') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
    navigate('/');
  }
  else if (option == "Profile") return (<div className="background"> <Navbar tab={tab} /> <Profile /> </div>)
  else if (option == 'Trainer' || option == 'Trainee') navigate(`/${user}/${id}/${option}`);
  else if (option == 'Trainer-add') return (<div className="background"> <Navbar tab={tab} /> <Courseadd /> </div>)
  else return (<div className="background"> <Navbar tab={tab} /> <Course /> </div>)
}

export default Admin
