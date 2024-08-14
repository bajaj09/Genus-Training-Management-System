/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, id } = useParams();
  console.log(user,id)
  const userr = sessionStorage.getItem('user');
  const idd = sessionStorage.getItem('id');
  
  let isAuthorized=0;
  if(user==userr && id==idd) isAuthorized=1;
  console.log(isAuthorized)

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
