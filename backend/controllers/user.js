// Import de notre modèle User :
const User = require("../models/User");
// Import du module bcrypt :
const bcrypt = require("bcrypt");
// Import de notre module jsonwebtoken :
const jwt = require("jsonwebtoken");

// Creation du controller concernant l'inscription d'un utilisateur :
exports.signup = (req, res, next) => {
  // On commence en premier lieu à hasher le mot de passe :
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Après obtention de ce hash nous pouvons créer l'utilisateur :
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
