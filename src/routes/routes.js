const { Router } = require("express");

const router = Router();

const hellowWorld = require("../controllers/helloWorld")

router.get("/helloworld", hellowWorld);

module.exports = router;
