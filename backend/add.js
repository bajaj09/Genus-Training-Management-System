import { trainer, trainee } from'./connect.js'
import mongoose from 'mongoose';
const uri = "mongodb+srv://aditibajaj0910:aditi@cluster0.vhw75ji.mongodb.net/tms";

mongoose.connect(uri, { ssl: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const add = async (req, res) => {
    const a = req.body;
    const department = a.department
    let count = 1;
  
    try {
      const last = await mongoose.model(`${a.user}`).findOne({ department }).sort({ [`${a.user}Id`]: -1 }).exec();
      const ans = parseInt(last[`${a.user}Id`].split('-')[2], 10);
      count = ans + 1;
    } catch (error) {
      count = 1;
    }
  
    if (a.user == 'trainee') a.id = `E-${a.department}-${count}`
    else a.id = `T-${a.department}-${count}`
  
    let data
    if (a.user == 'trainee') data = new trainee({
      traineeId: a.id, name: a.name, email: a.email,
      dob: a.dob, doj: a.doj, department: a.department, password: a.id,
    });
    else data = new trainer({
      trainerId: a.id, name: a.name, email: a.email,
      dob: a.dob, doj: a.doj, department: a.department, specialization: a.specialization, designation: a.designation, password: a.id,
    });
  
    try {
      await data.save();
      res.json('Added successfully');
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  }

export default add
