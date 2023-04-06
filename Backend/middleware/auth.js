//Imports
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Export
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'user ID invalide';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide')
        });
    }
 };