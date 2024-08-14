/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams } from 'react-router-dom'
// import "./Profile.css"

const Feedback = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { user } = useParams();
  const { id } = useParams();
  const { cid } = useParams();
  const [duration, setDuration] = useState(0);
  const [content, setContent] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [instructions, setInstructions] = useState(0);
  const [trainer, setTrainer] = useState(0);

  useEffect(() => {}, []);


  const onSubmit = async () => {
    let data={}
    data.duration=duration
    data.content=content
    data.questions=questions
    data.instructions=instructions
    data.trainer=trainer
    data.id=id
    data.cid=cid
    //console.log(data)
    let r = await fetch(`https://training-management-system.onrender.com/feedback`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })
    const suc = await r.json();
    //console.log(suc)
    if (suc == 'Done') navigate(`/${user}/${id}`);
  }

  return (
    <div className="dialog-box">
      <div className="feedback1">
        <div className="formheading">Training Feedback Form</div>
          <div className="form-group">
            <label>Duration of training was sufficient</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(value => (
                <span key={value} className={`star ${duration >= value ? 'selected' : ''}`} onClick={() => setDuration(value)} 
                style={{ cursor: 'pointer', color: duration >= value ? '#FFD700' : '#e4e5e9' }}>★</span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Content was well organised</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(value => (
                <span key={value} className={`star ${content >= value ? 'selected' : ''}`} onClick={() => setContent(value)} 
                style={{ cursor: 'pointer', color: content >= value ? '#FFD700' : '#e4e5e9' }}>★</span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Questions were encouraged</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(value => (
                <span key={value} className={`star ${questions >= value ? 'selected' : ''}`} onClick={() => setQuestions(value)} 
                style={{ cursor: 'pointer', color: questions >= value ? '#FFD700' : '#e4e5e9' }}>★</span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Instructions were clear and understandable</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(value => (
                <span key={value} className={`star ${instructions >= value ? 'selected' : ''}`} onClick={() => setInstructions(value)} 
                style={{ cursor: 'pointer', color: instructions >= value ? '#FFD700' : '#e4e5e9' }}>★</span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>The trainer was well prepared</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(value => (
                <span key={value} className={`star ${trainer >= value ? 'selected' : ''}`} onClick={() => setTrainer(value)} 
                style={{ cursor: 'pointer', color: trainer >= value ? '#FFD700' : '#e4e5e9' }}>★</span>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => onSubmit()}>Submit</button>
      </div>
    </div>
  )
};

export default Feedback;
