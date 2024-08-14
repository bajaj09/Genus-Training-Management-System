/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'
// import './Adnav.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Courseadd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // const query = useQuery();
  // const id = query.get('id');
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    console.log(data)
    let r = await fetch(`https://training-management-system.onrender.com/trainer/add?id=${id}`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })
    const suc = await r.json();
    console.log(suc)
    if (suc == 'Added successfully') setSuccessMessage('Course Added');
  }
  return (
    <>

      <div className="form">
      <div className="form-box">
        <div className="formheading">Enter Course Details</div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

          <input placeholder='Name' {...register("name", { required: { value: true, message: "This field is required" }, })} type="name" />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />

          <input placeholder='Start Data'  {...register("sdate", { required: { value: true, message: "This field is required" }, })} type="date" />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />

          <input placeholder='Duration'  {...register("duration", { required: { value: true, message: "This field is required" }, })} type="duration" />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />

          <input placeholder='Time'  {...register("time", { required: { value: true, message: "This field is required" }, })} type="ttime" />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />

          <input placeholder='Discription'  {...register("discription", { required: { value: true, message: "This field is required" }, })} type="discription" />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />

          <input type="submit" value="Submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
        </form>
      </div></div>
    </>
  )
}

export default Courseadd