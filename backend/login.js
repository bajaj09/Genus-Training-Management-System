import { admins, trainer, trainee } from './connect.js'

const login = async (req, res) => {
    const { username, password, user } = req.body;
    let userr = [];
    try {
        if (user == 'admin') userr = await admins.find({ name: username, password: password });
        if (user == 'trainer') userr = await trainer.find({ trainerId: username, password: password });
        if (user == 'trainee') userr = await trainee.find({ traineeId: username, password: password });
        if (userr[0]) {
            res.json({ message: 'found' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error querying collection:', error);
    }
};

export default login
