import {trainer, trainee } from './connect.js'

const del = async (req, res) => {
    const a = req.body;
    try {
      if (a.table == 'Trainer') await trainer.findOneAndDelete({ trainerId: a.id });
      else await trainee.findOneAndDelete({ traineeId: a.id });
      res.json("Deleted")
    } catch (error) {
      res.json("Not Deleted")
    }
}

export default del
