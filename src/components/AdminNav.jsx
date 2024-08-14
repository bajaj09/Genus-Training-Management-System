/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import React from 'react'
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import Show from './Show';
import Add from './Add'

const Ad_trainer_nav = () => {

  const { navtitle } = useParams();
  const { user } = useParams();
  const { id } = useParams();

  const [ans, setAns] = useState(0);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data == 'back') navigate(`/${user}/${id}`)
    else if (data == 'add') setAns(1)
    else if (data == 'show') setAns(0)
  };

  useEffect(() => {
  }, [ans])

  if (navtitle == 'Trainer' || navtitle == 'Trainee') {
    return (
      <div className="background">

         <div className="navbar">

          <div className="logo"><img src="\logo.jpg" alt="" />Training Management System</div>

          <div className="working">

            <button type="button" onClick={() => onSubmit("show")}>{`${navtitle} Master Data`}</button>
            <button type="button" onClick={() => onSubmit("add")}>{`Add ${navtitle}`}</button>
            <button type="button" onClick={() => onSubmit("back")}>Back</button>
          </div>
        </div>
        {ans == 0 ? <Show /> : <Add />}
      </div>
    )
  }
};

export default Ad_trainer_nav;
