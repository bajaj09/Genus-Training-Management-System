/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

const Trainernav = ({ sendDataToParent }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    sendDataToParent(data); // Send data to parent component
  };

  return (
    <div className="navbar">
      <div className="logo">Training Management System</div>
        <div className="form-floating">
          <button type="button" onClick={() => onSubmit("Show")}>Courses Assigned</button>
          <button type="button" onClick={() => onSubmit("Addcourses")}>Add Courses</button>
          <button type="button" onClick={() => onSubmit("Profile")}>Profile</button>
          <button type="button" onClick={() => onSubmit("Logout")}>Log Out</button>
        </div>
    </div>
  );
};

Trainernav.propTypes = {
  sendDataToParent: PropTypes.func.isRequired, // Define propTypes for sendDataToParent
};

export default Trainernav;
