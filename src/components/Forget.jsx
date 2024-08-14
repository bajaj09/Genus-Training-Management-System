/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'


function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(0);
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState();
  const [d, setData] = useState();
  useEffect(() => { }, [ans]);

  const generateOTP = async() => {
      let r = await fetch(`https://training-management-system.onrender.com/forget?user=${d.user}&id=${d.username}`)
      const anss = await r.json();
      setOtp(anss)
      const a=(Date.now()) +(1*60*1000)
      setTime(a);
      console.log((Date.now()) +(1*60*1000),a)
      setAns(1);
  };

  const onSubmit = async (data) => {
    let updatedData={}
    setData(data)
    if (ans == 0) {
      let r = await fetch(`https://training-management-system.onrender.com/forget?user=${data.user}&id=${data.username}`)
      const anss = await r.json();
      setOtp(anss)
      const a=(Date.now()) +(1*60*1000)
      setTime(a);
      console.log((Date.now()) +(1*60*1000),a)
      setAns(1);
    }
    else if(ans==1){
      console.log(time)
      if(time>=Date.now()){
        if(data.otp==otp && time>=Date.now()) setAns(2)
        else {setAns(0);alert("Incorrect OTP")}
      }
      else alert('Not a valid OTP')
    }
    else {
      updatedData['password']=data.confirm
      //console.log(data.password ,data.confirm)
      if (data.password == data.confirm) {
        let r = await fetch(`https://training-management-system.onrender.com/modify?table=${data.user}&id=${data.username}`, {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(updatedData)
        })
        const suc = await r.json();
        if(suc == 'Modified') navigate(`/`)
      }
      else alert("Password is not matched")
    }
  }

  return (
    <div className="Home">
      <div className="login">
        <img src="nogenus.png" alt="" />
        <div className='loginheading loginheading1'>Training Management System</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-floating">
            <select
              placeholder='user'
              {...register("user", { required: { value: true, message: "This field is required" }, })}
              type="user">
              <option selected>Select user</option>
              <option value="admin">Admin</option>
              <option value="trainer">Trainer</option>
              <option value="trainee">Trainee</option>
            </select>
          </div>

          <input placeholder='username' {...register("username", { required: { value: true, message: "This field is required" }, })}type="username"/>
          {errors.username && <div className='red'>{errors.username.message}</div>}<br />

          {ans==1 ? <><input placeholder='OTP' {...register("otp", { required: { value: true, message: "This field is required" }, })}type="otp"/><br /></> : null}
          
          {ans==2 ? <><input placeholder='Enter Password' {...register("password", { required: { value: true, message: "This field is required" }, })}type="text"/><br /></> : null}

          {ans==2 ? <><input placeholder='Confirm Password' {...register("confirm", { required: { value: true, message: "This field is required" }, })}type="password"/><br /></> : null}
          
          <input disabled={isSubmitting} type="submit" value="Submit" />
          {isSubmitting && <div>Loading...</div>}
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
        </form>
        {ans==1 ?<><button onClick={() => generateOTP()} className='reload'>Resend OTP</button><br /></>:null}
      </div>
    </div>
  )
}

export default App