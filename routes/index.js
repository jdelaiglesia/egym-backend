const { Router } = require("express");

const router = Router();

app.get("/helloworld", function (req, res) {
  res.send("Hola Mundo!");
});

module.exports = router;
