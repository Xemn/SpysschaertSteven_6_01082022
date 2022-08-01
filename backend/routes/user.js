// Import de notre module express :
const express = require("express");
// Utilisation de la méthode Router :
const router = express.Router();
// Import de notre controller user :
const userCtrl = require("../controllers/user");

// Route POST pour la création d'un utilisateur :
router.post("/signup", userCtrl.signup);
// Route POST pour la connexion d'un utilisateur :
router.post("/login", userCtrl.login);

// Export de nos routes :
module.exports = router;
