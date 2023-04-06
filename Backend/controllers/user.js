//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const passwordSchema = require('../models/password');


exports.signup = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({message: 'Le mot de passe doit contenir entre 8 et 100 caractères, avec au moins une majuscule, une minuscule et un chiffre.'});
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({message: 'Utilisateur crée!'}))
                    .catch(error => {res.status(400).json({error})});
            })
            .catch(error => res.status(500).json({error}));
    }
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (User === null) {
                res.status(401).json({message:'Utilisateur non trouvé !'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({message: 'Mot de passe incorrect !'});
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    {userId: user._id},
                                    process.env.RANDOM_SECRET_TOKEN,
                                    {expiresIn: '24h'}
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({error});
                    });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        });
};