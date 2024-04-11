require("dotenv").config();

const mongoose = require("mongoose");

// URL de conexión a la base de datos de MongoDB
const dbURL = process.env.MONGODB_URL;

// Conexión a la base de datos
mongoose
  .connect(dbURL, {})
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos: ", error);
  });
