import {trainer,trainee } from './connect.js' 

const profile = async (req, res) => {
    const id = req.query.id;
    const user = req.query.table;
    try {
      let data
      if (user == 'trainer') data = await trainer.find({ trainerId: id });
      else data = await trainee.find({ traineeId: id });
      res.json(data[0]);
    } catch (error) {
      console.error('Error querying admin collection:', error);
    }
}

export default profile
