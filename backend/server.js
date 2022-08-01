// Import du module HTTP afin de pouvoir faire des requêtes HTTP :
const http = require("http");
// Import de notre application :
const app = require("./app");

// Vérification et renvoie d'un port valide :
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");

/* Notre application à besoin de savoir sur quel port travailler, nous lui
passons donc le port que nous venons de vérifier :  */
app.set("port", port);

// Traitement d'éventuelles erreurs :

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.log(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création de notre serveur :
const server = http.createServer(app);

/* On écoute les éventuelles erreurs et on affiche sur quel port 
nous travaillons dans la console : */
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Nous écoutons enfin ce qu'il se passe sur notre server :
server.listen(port);
