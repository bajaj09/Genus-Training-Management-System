/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styling/Delete.css'
const Delete = () => {

  const {userr} = useParams();
  const {idd} = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data == 'no') navigate(`/admin/admin/${userr}`)
    else {
      const dataa = { table: userr, id: idd }
      let r = await fetch("https://training-management-system.onrender.com/delete", {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(dataa)
      })
      const suc = await r.json();
      if (suc != 'Deleted') alert(`${idd} not Deleted`)
      navigate(`/admin/admin/${userr}`)
      
    }
  }

  return (
    <div className="dialog-box">

      <div className="dialog">

        <img src="\logo.jpg" alt="" />

        <h2>{`Are you sure you want to delete trainer ${idd}`}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating">
            <button type="button" onClick={() => onSubmit("yes")}>Yes</button>
            <button type="button" onClick={() => onSubmit("no")}>No</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Delete
