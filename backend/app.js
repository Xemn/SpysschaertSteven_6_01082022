// Import de notre module Express :
const express = require("express");
// Import de notre module Path :
const path = require("path");
// Import de notre module mongoose :
const mongoose = require("mongoose");
// Import de notre module dotenv :
const dotenv = require("dotenv");
dotenv.config();

// Lien fait entre notre base de donnée MongoDB et notre application :
mongoose
  .connect(MONGO_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Import de nos fichiers de routing :
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Création de notre application express :
const app = express();

/* Afin de récupérer le corps d'une reqûete post, 
on a besoin d'en extraire le corps JSON :  */
app.use(express.json());

/* Applications d'entête afin d'aplliquer nos propres règles de 
sécurité CORS : */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Indique à notre application Express de se servir du dossier static images :
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation de nos différentes routes :
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// On exporte notre application :
module.exports = app;
