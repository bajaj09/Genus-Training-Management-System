/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Modify = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { userr } = useParams('user');
  const { idd } = useParams('id');
  //console.log('modify')
  const navigate = useNavigate();

  const onSubmitrainer = async (data) => {
    console.log(data)
    let updatedData = {}
    for (const key in data) { if (data[key]) updatedData[key] = data[key]; }
    console.log(updatedData)
    let r = await fetch(`https://training-management-system.onrender.com/modify?table=${userr}&id=${idd}`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(updatedData)
    })
    const suc = await r.json();
    if (suc != 'Modified') alert('Data not Modified')
    navigate(`/admin/admin/${userr}`)
  }
    return (
      <div className="background">
        <div className="form">
          <div className="form-box">
            <div className="formheading">Enter data for fields that need to be modified</div>
            <form action="" onSubmit={handleSubmit(onSubmitrainer)}>
              <h4>{`${userr}'s id is ${idd}`}</h4>
              <input placeholder='Name' {...register("name")} type="name" />
              {errors.password && <div className='red'>{errors.password.message}</div>}
              <br />

              <input placeholder='E-mail'  {...register("email")} type="email" />
              {errors.password && <div className='red'>{errors.password.message}</div>}
              <br />

              <input placeholder='Date of Birth'  {...register("dob")} type="date" />
              {errors.password && <div className='red'>{errors.password.message}</div>}
              <br />

              <input placeholder='Date of Joining'  {...register("doj")} type="date" />
              {errors.password && <div className='red'>{errors.password.message}</div>}
              <br />

              <input placeholder='Department'  {...register("department")} type="department" />
              {errors.password && <div className='red'>{errors.password.message}</div>}
              <br />

              {userr == 'Trainer' ? (<><input placeholder='Specialization' {...register("specialization")} type="specialization" />
                {errors.password && <div className='red'>{errors.password.message}</div>}
                <br /></>) : null}

              {userr == 'Trainer' ? (<><input placeholder='Designation'  {...register("designation")} type="designation" />
                {errors.password && <div className='red'>{errors.password.message}</div>}
                <br /></>) : null}

              <input type="submit" value="Submit" />
              {errors.myform && <div className='red'>{errors.myform.message}</div>}
              {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
            </form>
          </div></div></div>
    )
}

export default Modify
