//Imports
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


//Connexion à la base de données
mongoose.connect('mongodb+srv://chloereyne:d1BS354SBhj28bem@cluster0.zeyg6c8.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Paramétrage des en-têtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use('/api/auth', userRoutes);

//Export
module.exports = app;