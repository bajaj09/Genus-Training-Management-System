import {trainer,course } from './connect.js' 
import mongoose from 'mongoose';
const uri = "mongodb+srv://aditibajaj0910:aditi@cluster0.vhw75ji.mongodb.net/tms";

mongoose.connect(uri, { ssl: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const courseadd = async (req, res) => {
    const a = req.body;
    const id = req.query.id;
    let dep = await (trainer.findOne({ trainerId: id }, 'department'))
    dep = dep.department
  
    let count = 1;
    try {
      const lastcourse = await mongoose.model('course').find({ department: dep }).exec();
      const ans = lastcourse.length
      console.log(ans)
      count = ans + 1;
    } catch (error) {
      count = 1;
    }
    a.id = `${dep}-${count}`
  
    const today = new Date();
    const aDate = new Date(a.sdate);
    if (aDate.getTime() > today.getTime()) a.status = 'Upcoming'
    else a.status = 'Ongoing'
    const edate = aDate
    edate.setDate(aDate.getDate() + parseInt(a.duration));

    const newTrainee = new course({
      courseId: a.id,
      name: a.name,
      department: dep,
      sdate: a.sdate,
      time: a.time,
      duration: a.duration,
      edate: edate,
      trainerId: id,
      status: a.status,
      discription: a.discription,
      empid: [],
      attendace: [],
      feedbackid: [],
      feedback: [{ duration: 0, content: 0, questions: 0, instructions: 0, trainer: 0 }]
    });
  
    try {
      await newTrainee.save();
      //console.log("Added")
      res.json('Added successfully');
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
}

export default courseadd
