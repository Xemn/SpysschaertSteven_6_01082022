// On importe notre module jsonwebtoken :
const jwt = require("jsonwebtoken");
// On importe notre module dotenv :
const dotenv = require("dotenv");
dotenv.config();

// Export de notre middlwarre :
module.exports = (req, res, next) => {
  /* Plusieurs erreurs pouvant se produire, nous mettons donc nos instructions
  dans un bloc try...catch :  */
  try {
    // On récupère en premier lieu notre token de notre header:
    const token = req.headers.authorization.split(" ")[1];
    // On décode et vérifie la conformité de notre token :
    const decodedToken = jwt.verify(token, TOKEN_KEYPHRASE);
    // On en extrait notre userId, encodé dans le token :
    const userId = decodedToken.userId;
    /* On ajoute à notre requête un objet auth afin qu'il contienne l'userID
    de note token : */
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
