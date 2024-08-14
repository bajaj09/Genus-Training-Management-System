/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function App() {

    const [captcha, setCaptchaText] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const canvasRef = useRef(null);


    useEffect(() => { drawCaptcha(); }, []);

    const onSubmit = async (data) => {
        console.log(data.captcha, captcha)
        if (data.captcha == captcha) {
            let r = await fetch("https://training-management-system.onrender.com/login", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(data)
            })
            const suc = await r.json();

            if (suc.message == 'found') {
                sessionStorage.setItem('user', data.user);
                sessionStorage.setItem('id', data.username);
                navigate(`/${data.user}/${data.username}`);
            }
            else alert("Invalid Username/Password")
        }
        else alert("Please enter the correct captcha code.")
    }

    const onSubmitPassword = async (data) => {
        navigate('/forget')
    }

    const generateCaptcha = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        setCaptchaText(captcha);
        return captcha
    };

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const captcha = generateCaptcha();

        setCaptchaText(captcha);

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add background noise
        ctx.fillStyle = '#f2f2f2';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the CAPTCHA text with random distortions
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000000';
        for (let i = 0; i < captcha.length; i++) {
            const x = 10 + i * 20;
            const y = 30 + Math.floor(Math.random() * 10);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(captcha[i], 0, 0);
            ctx.restore();
        }

        // Add random lines
        for (let i = 0; i < 7; i++) {
            ctx.strokeStyle = '#888888';
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
    };

    return (
        <>
            <div className="back"><img src="login-background.jpg" alt="" /></div>
            <div className="Home">

                <div className="login">

                    <img src=".\nogenus.png" alt="" />

                    <div className='loginheading'>Training Management System</div>

                    <form action="" onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <select placeholder='user' {...register("user", { required: { value: true, message: "This field is required" }, })} type="user">
                                <option selected>Select user</option>
                                <option value="admin">Admin</option>
                                <option value="trainer">Trainer</option>
                                <option value="trainee">Trainee</option>
                            </select>
                        </div>

                        <input placeholder='username' {...register("username", { required: { value: true, message: "This field is required" }, })} type="username" />
                        <br />

                        <input placeholder='password' {...register("password", { required: { value: true, message: "This field is required" }, })} type="password" />
                        <br />

                        <canvas ref={canvasRef} width={169} height={44} style={{ border: '1px solid #ccc' }}></canvas>
                        <button onClick={() => drawCaptcha()} className='reload'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                        </svg></button><br />
                        <input placeholder='Enter Captcha' {...register("captcha", { required: { value: true, message: "This field is required" }, })} type="text" />

                        <input disabled={isSubmitting} type="submit" value="Submit" />
                        {isSubmitting && <div>Loading...</div>}

                    </form>
                    <button className='forget' type="button" onClick={() => onSubmitPassword("forget")}>Forget Password</button>
                </div>
            </div>
        </>
    )
}

export default App