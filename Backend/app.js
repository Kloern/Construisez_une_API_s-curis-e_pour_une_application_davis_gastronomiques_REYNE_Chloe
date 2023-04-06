//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


//Connexion à la base de données
mongoose.connect('mongodb+srv://chloereyne:<password>@cluster0.zeyg6c8.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Sécurisation des en-têtes http
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" })) ;

app.use(bodyParser.json());

//Paramétrage des en-têtes qui permet d'autoriser les requêtes provenant de toutes les origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//Export
module.exports = app;
