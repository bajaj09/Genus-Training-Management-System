import {trainee,course } from './connect.js'

const attendance = async (req, res) => {
    const id = req.query.id;
    const work = req.query.work;
    try {
      let trainees = ""
      if (work == 'attendance') {
        const coursee = await course.findOne({ courseId: id }, 'empid').lean();
        const emp = coursee.empid;
        if (emp.length > 0) trainees = await trainee.find({ traineeId: { $in: emp } }, 'traineeId name')
      }
      else trainees = await trainee.find();
      res.json(trainees)
    } catch (error) {
      res.json("Not")
    }
}

export default attendance
