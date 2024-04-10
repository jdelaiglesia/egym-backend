const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/routes/routes");

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use("/api", router);

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
});

module.exports = server;
