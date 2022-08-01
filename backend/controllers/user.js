// Import de notre modèle User :
const User = require("../models/User");
// Import du module bcrypt :
const bcrypt = require("bcrypt");
// Import de notre module jsonwebtoken :
const jwt = require("jsonwebtoken");
//Import de notre module dotenv :
const dotenv = require("dotenv");
dotenv.config();

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

// Création du controller concernant la connexion d'un utilisateur :
exports.login = (req, res, next) => {
  /* On vérifie en premier lieu si l'addresse mail entrée lors de la 
    tentavie de connexion existe dans notre base de données : */
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Si l'utilisateur n'existe pas :
      if (!user) {
        return res.status(401).json({ error: "Utilisateur introuvable" });
      }
      // Si il existe :
      // Nous comparons le hash des deux mots de passes :
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // Si le mot de passr est incorrecte :
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // Si il est valide :
          res.status(200).json({
            // On crée un objet contenant un userId et un token :
            userId: user._id,
            token: jwt.sign(
              // Données encodées (ou payload) :
              { userId: user._id },
              // Chaine secrète de developpement temporaire :
              TOKEN_KEYPHRASE,
              // Son délai d'expiration :
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
