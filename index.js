const server = require("./app");
const mongoose = require("./db");

const PORT = 3001;

server.listen(PORT, () => {
  console.log("Server raised in port: " + PORT);
});
