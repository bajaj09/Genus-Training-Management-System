/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams } from 'react-router-dom'
import '../styling/Form.css'

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();
  const { navtitle } = useParams();

  const onSubmit = async (data) => {
    //console.log(data)
    if(navtitle == 'Trainer') data.user='trainer'
    else data.user='trainee'
    
    let r = await fetch(`https://training-management-system.onrender.com/add`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })
    const suc = await r.json();
    if (suc == 'Added successfully') alert('User Added');
  }

  return (
    <>
      <div className="form">

        <div className="form-box">

        <div className="formheading">{`Enter ${navtitle} Details`}</div>
       
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="input-box">
          <label htmlFor="">Name</label>
          <input placeholder='Name' {...register("name", { required: { value: true, message: "This field is required" }, })} type="name" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br /></div>

          <div className="input-box">
          <label htmlFor="">E-Mail</label>
          <input placeholder='E-mail'  {...register("email", { required: { value: true, message: "This field is required" }, })} type="email" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br /></div>

          <div className="input-box">
          <label htmlFor="">Date of Birth</label>
          <input placeholder='Date of Birth'  {...register("dob", { required: { value: true, message: "This field is required" }, })} type="date" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br /></div>

          <div className="input-box">
          <label htmlFor="">Date of Joining</label>
          <input placeholder='Date of Joining'  {...register("doj", { required: { value: true, message: "This field is required" }, })} type="date" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br /></div>

          <div className="input-box">
          <label htmlFor="">Department</label>
          <input placeholder='Department'  {...register("department", { required: { value: true, message: "This field is required" }, })} type="department" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br /></div>
          
          {navtitle === 'Trainer' ? (<>  <div className="input-box"><label htmlFor="">Specialization</label> <input placeholder='Specialization' {...register("specialization", { required: { value: true, message: "This field is required" } })} type="text" />
            {errors.specialization && <div className='red'>{errors.specialization.message}</div>} <br /></div> </>) : null}

            
          {navtitle === 'Trainer' ? (<> <div className="input-box"><label htmlFor="">Designation</label> <input placeholder='Designation' {...register("designation", { required: { value: true, message: "This field is required" } })} type="text" />
            {errors.specialization && <div className='red'>{errors.specialization.message}</div>} <br /></div> </>) : null}

          <input type="submit" value="Submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}

        </form>
      </div></div>
    </>
  )
}

export default App