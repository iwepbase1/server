const express = require("express");
const middlewares = require("../middleware");

const controllers = require("../controllers");

const router = express.Router();

router.post(
  "/onboarding",
  middlewares.verifyAccessToken,
  controllers.onBoarding.onBoarding
);

module.exports = router;
