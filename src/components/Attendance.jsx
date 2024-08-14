/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'

const Addempcrse = () => {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {id} =useParams();
  const {cid} =useParams();
  const {user} =useParams();
  const {work} =useParams();
  //console.log(id,cid,user,work)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(cid,work)
        let r = await fetch(`https://training-management-system.onrender.com/trainer?id=${cid}&work=${work}`)
        const data = await r.json();
        setData(data);
        //console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const onSubmit = async (d) => {
    //console.log(typeof d.item)
    let a
    if(typeof d.item!='object') a=Array.of(d.item)
    else a=d.item
    let r = await fetch(`http://localhost:3000/trainer/mark?id=${cid}&work=${work}`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(a)
    })
    const suc=await r.json()
    console.log(suc)
    if(suc!='Done') alert("Not Added")
    navigate(`/${user}/${id}`)
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="background">
      <div className="form">
        <div className="form-box">
        <div className="formheading">{work=='emp' ? 'Add Employees' : 'Mark Attendance'}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.traineeId}>
                <td>{item.traineeId}</td>
                <td>{item.name}</td>
                <td><input type="checkbox" id={item.traineeId} value={item.traineeId} {...register('item')} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="submit" value="Submit" />
      </form>
    </div></div></div>
  )
}

export default Addempcrse
