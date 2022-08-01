// Import de mongoose :
const mongoose = require("mongoose");
// Import d'un plugin nous permettant de mieux gérer le côté unique :
const uniqueValidator = require("mongoose-unique-validator");

// Création de notre schéma User :
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Utilisation de notre plugin sur notre Schéma :
userSchema.plugin(uniqueValidator);

// Export de notre Schéma en tant que modèle :
module.exports = mongoose.model("User", userSchema);
