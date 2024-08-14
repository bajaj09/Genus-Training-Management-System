import {trainer, trainee } from './connect.js'

const mod = async (req, res) => {
    const a = req.body;
    const table = req.query.table
    const id = req.query.id
    try {
      if (table == 'Trainer' || table == 'trainer') await trainer.findOneAndUpdate({ trainerId: id }, a, { new: true, runValidators: true });
      else if (table == 'Trainee' || table == 'trainee') await trainee.findOneAndUpdate({ traineeId: id }, a, { new: true, runValidators: true, });
      res.json("Modified")
    } catch (error) { res.json("Not") }
}

export default mod
