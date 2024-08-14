import nodemailer from 'nodemailer';
import {trainer,trainee,admins } from './connect.js' 

const forget = async (req, res) => {
    const user = req.query.user;
    const id = req.query.id;
    let data
    if (user == 'trainer') data = await trainer.find({ trainerId: id });
    else if (user == 'trainee') data = await trainee.find({ traineeId: id });
    else data = await admins.find({ trainerId: id });
    console.log(data[0].email)
    const otp = Math.floor(100000 + Math.random() * 900000);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aditibajaj0910@gmail.com',
            pass: 'lnhn fbqt tqlv iuvj'
        }
    });

    let mailOptions = {
        from: 'aditibajaj0910@gmail.com',
        to: data[0].email,
        subject: 'OTP to Reset Password',
        text: `Your OTP code to reset password is ${otp} and is valid for 5 mins.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json(otp);
    } catch (error) {
        res.status(500).json({ error: 'Error sending OTP' });
    }

}

export default forget
