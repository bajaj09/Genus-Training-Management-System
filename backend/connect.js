import mongoose from 'mongoose';

const uri = "mongodb+srv://aditibajaj0910:aditi@cluster0.vhw75ji.mongodb.net/tms";

mongoose.connect(uri, { ssl: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const adminSchema = new mongoose.Schema({});
export const admins = mongoose.model('admins', adminSchema);

const trainerSchema = new mongoose.Schema({
  trainerId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  dob: Date,
  doj: Date,
  department: String,
  specialization: String,
  designation: String,
  password: String,
});
export const trainer = mongoose.model('trainer', trainerSchema);

const traineeSchema = new mongoose.Schema({
  traineeId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  dob: Date,
  doj: Date,
  department: String,
  password: String,
});
export const trainee = mongoose.model('trainee', traineeSchema);

const courseSchema = new mongoose.Schema({
  courseId: { type: String, unique: true },
  name: String,
  department: String,
  sdate: Date,
  time: String,
  duration: Number,
  edate: Date,
  trainerId: { type: String },
  status: String,
  description: String,
  empid: [{ type: String }],
  attendance: [{ type: String }],
  feedbackid: [{ type: String }],
  feedback: [{ duration: Number, content: Number, questions: Number, instructions: Number, trainer: Number }]
});
export const course = mongoose.model('course', courseSchema);
