const express = require("express");

const router = express.Router();

const authRouter = require("./authRouter");
const onBoardingRouter = require("./onBoardingRoute");

router.use("/authentication", authRouter); 
router.use("/onboarding", onBoardingRouter);

module.exports = router;
