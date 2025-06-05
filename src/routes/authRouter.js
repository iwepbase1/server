const express = require("express");
const middlewares = require("../middleware");

const controllers = require("../controllers");

const router = express.Router();

router.post("/auth", controllers.auth.auth);

router.post("/register", controllers.auth.register);

router.post("/admin-register", controllers.auth.adminRegister);

router.post("/admin-login", controllers.auth.adminLogin);

module.exports = router;