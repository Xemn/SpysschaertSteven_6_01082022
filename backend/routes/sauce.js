// Import de notre module Express :
const express = require("express");
// Utilisation de la méthode Router d'express :
const router = express.Router();
// Import de notre controller sauce :
const sauceCtrl = require("../controllers/sauce");
// Import de notre middleware d'authentification :
const auth = require("../middleware/auth");
// Import de notre middleware de config multer :
const multer = require("../middleware/multer-config");
// Nos différentes routes :
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateOneSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);
// Export de nos routes :
module.exports = router;
