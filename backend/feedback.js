import {course } from './connect.js' 
import mongoose from 'mongoose';

const uri = "mongodb+srv://aditibajaj0910:aditi@cluster0.vhw75ji.mongodb.net/tms";

mongoose.connect(uri, { ssl: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const feedback = async (req, res) => {
    const a = req.body;
    try {
      const c = await course.findOne({ courseId: a.cid });
      if (c.feedback.length > 0) {
        c.feedback[0].duration += parseInt(a.duration);
        c.feedback[0].content += parseInt(a.content);
        c.feedback[0].questions += parseInt(a.questions);
        c.feedback[0].instructions += parseInt(a.instructions);
        c.feedback[0].trainer += parseInt(a.trainer);
      }
      await c.save();
      await course.findOneAndUpdate({ courseId: a.cid }, { $addToSet: { feedbackid: a.id } }, { new: true, upsert: true });
      res.json("Done")
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  
  }

export default feedback
