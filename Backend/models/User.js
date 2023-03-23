//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//définition d'un modèle de données d'un utilisateur
const userSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
});

//Plugin qui assure que chaque mail d'utilisateur est unique
userSchema.plugin(uniqueValidator);

//Export
module.exports = mongoose.model('User', userSchema);