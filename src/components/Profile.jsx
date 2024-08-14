/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState, memo } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import '../styling/Profile.css'

const Profile = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useParams();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let r = await fetch(`https://training-management-system.onrender.com/profile?id=${id}&table=${user}`)
        const data = await r.json()
        data.dob = data.dob.split('T')[0]
        data.doj = data.doj.split('T')[0]
        console.log(data)
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    navigate(`/password/${user}/${id}`)
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <h2>General Details</h2>
        
        <div className='profilelogo'>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="loginlogo" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg></div>

        <div className="profile-item">
          <span className="profile-label">Name:</span>
          <span className="profile-value">{data.name}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">E-mail:</span>
          <span className="profile-value">{data.email}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Date of Birth:</span>
          <span className="profile-value">{data.dob}</span>
        </div>
      </div>
      <div className="profile-card">
        <h2>Other Details</h2>
        <div className="profile-item">
          <span className="profile-label">Id:</span>
          <span className="profile-value">{user=='trainer' ? data.trainerId : data.traineeId}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Date of Joining:</span>
          <span className="profile-value">{data.doj}</span>
        </div>
        {user=='trainer' ?
        <div className="profile-item">
          <span className="profile-label">Specialization:</span>
          <span className="profile-value">{data.specialization}</span>
        </div>:null}
        <div className="profile-item">
          <span className="profile-label">Department:</span>
          <span className="profile-value">{data.department}</span>
        </div>
        {user=='trainer' ?
        <div className="profile-item">
          <span className="profile-label">Designation:</span>
          <span className="profile-value">{data.designation}</span>
        </div>:null}
        <div className="profile-item">
          <span className="profile-label">Password:</span>
          <span className="profile-value">{data.password}</span>
        </div>
        <div className="profile-flex"><button type="button" onClick={() => onSubmit("change")}>Change Password</button></div>
      </div>
    </div>
  )
}

export default Profile
