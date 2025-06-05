const express = require("express");
const middlewares = require("../middleware");

const controllers = require("../controllers");

const router = express.Router();

router.get(
  "/get-all-interests",
  middlewares.verifyAccessToken,
  controllers.interests.getAllInterest
);

module.exports = router;
