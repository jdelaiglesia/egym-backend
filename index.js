const server = require("./app");
const mongoose = require("./db");

const PORT = process.env.PORT || 80;

//Commit de prueba

server.listen(PORT, () => {
  console.log("Server raised in port: " + PORT);
});
