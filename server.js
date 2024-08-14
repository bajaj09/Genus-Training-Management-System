/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import login from './backend/login.js'
import courseshow from './backend/courseshow.js'
import add from './backend/add.js'
import tshow from "./backend/tshow.js"
import del from "./backend/delete.js"
import mod from "./backend/mod.js"
import attendance from "./backend/attendance.js"
import courseadd from "./backend/courseadd.js"
import mark from "./backend/mark.js"
import profile from "./backend/profile.js"
import feedback from "./backend/feedback.js"
import forget from "./backend/forget.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log( __dirname)   
const app = express()
app.use(cors({
    origin: 'https://training-management-system.onrender.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

app.post("/login", login);

app.post('/course', courseshow)

app.post('/add', add)

app.get('/admin', tshow)

app.post('/delete', del)

app.post('/modify', mod)

app.get('/trainer', attendance)

app.post('/trainer/add', courseadd)

app.post('/trainer/mark', mark)

app.get('/profile', profile)

app.post('/feedback', feedback)

app.get('/forget', forget)

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist', 'index.html'));});
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})