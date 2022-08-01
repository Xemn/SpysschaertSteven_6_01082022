// Import de notre modèle Sauce :
const Sauce = require("../models/Sauce");
// Import du module fs :
const fs = require("fs");
/* Dans ce fichier on dépose la logique métier afin que notre fichier de routes,
ne comporte lui que la logique de routing :  */

// Logique métier pour la création d'une sauce :
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // console.log(req.body.sauce);
  // Création d'une nouvelle sauce :
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré ! " });
    })
    .catch((error) => res.status(400).json({ error }));
};
// Logique métier afin d'obtenir les détails d'une seule sauce :
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
// Logique métier afin d'obtenir toutes les sauces :
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
