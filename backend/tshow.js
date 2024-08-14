import {trainer, trainee } from './connect.js'

const tshow = async (req, res) => {
    const emp = req.query.navtitle;
    try {
      let data
      if (emp == 'Trainer') data = await trainer.find();
      else data = await trainee.find();
      res.json(data);
    } catch (error) {
      console.error('Error querying admin collection:', error);
    }
}
export default tshow
