//Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//définition de deux routes pour l'inscription et la connexion
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Export
module.exports = router;