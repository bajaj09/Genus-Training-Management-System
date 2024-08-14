import {course } from './connect.js' 
import mongoose from 'mongoose';
const uri = "mongodb+srv://aditibajaj0910:aditi@cluster0.vhw75ji.mongodb.net/tms";

mongoose.connect(uri, { ssl: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const mark = async (req, res) => {
    const id = req.query.id;
    const work = req.query.work;
    const a = req.body;
    try {
      if (work == 'emp') await course.findOneAndUpdate({ courseId: id }, { $addToSet: { empid: { $each: a } } }, { new: true, upsert: true });
      else await course.findOneAndUpdate({ courseId: id }, { $addToSet: { attendance: { $each: a } } }, { new: true, upsert: true });
      res.json("Done")
    } catch (error) {
      console.log(error)
      res.json("Not")
    }
}
export default mark
