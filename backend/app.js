// Import de notre module Express :
const express = require("express");
// Import de notre module Path :
const path = require("path");
// Import de notre module mongoose :
const mongoose = require("mongoose");

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

// On exporte notre application :
module.exports = app;
