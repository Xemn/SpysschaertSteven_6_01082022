// On importe notre module multer :
const multer = require("multer");

// On définit ici un dictionnaire de type d'images :
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/* Variable qui contient la configuration de multer afin de lui indiquer 
où enregistrer les fichiers : */
const storage = multer.diskStorage({
  // Cette fonction indique à mutler où enregistrer les images :
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  /* Indique à multer d'utiliser le nom d'origine , de remplacer
  d'éventuels espaces par des "_", d'ajouter un timestamp, et de lui
  apporter l'extension appropriée :  */
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

/* Enfin on exporte notre config multer, en lui passant notre constante 
de configuration et en lui précisant que nous téléchargons que les images : */
module.exports = multer({ storage: storage }).single("image");
