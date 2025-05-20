const express = require("express");
const middlewares = require("../middleware");

const controllers = require("../controllers");

const router = express.Router();

router.post("/auth", controllers.auth.auth);

module.exports = router;