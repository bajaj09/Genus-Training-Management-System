/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams } from 'react-router-dom'

const Password = () => {

  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();
  const { user } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    let updatedData={}
    updatedData['password']=data.confirm
    if (data.password == data.confirm) {
      let r = await fetch(`https://training-management-system.onrender.com/modify?table=${user}&id=${id}`, {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(updatedData)
      })
      const suc = await r.json();
      if(suc == 'Modified') navigate(`/${user}/${id}`)
    }
    else alert("Password is not matched")

  }

  return (
      <div className="dialog-box">
        <div className="dialog">
          <img src="/logo.jpg" alt="" />
          <h2>{`Enter New Password`}</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

          <input placeholder='Enter Password' {...register("password", { required: { value: true, message: "This field is required" }, })} type="text" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br />

          <input placeholder='Confirm Password'  {...register("confirm", { required: { value: true, message: "This field is required" }, })} type="password" />
          {errors.password && <div className='red'>{errors.password.message}</div>} <br />

          <input type="submit" value="Submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}

        </form></div>

      </div>
  )
}

export default Password
