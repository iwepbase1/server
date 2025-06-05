const express = require("express");

const router = express.Router();

const authRouter = require("./authRouter");
const onBoardingRouter = require("./onBoardingRoute");
const interestRouter = require("./interestRouter");

router.use("/authentication", authRouter); 
router.use("/onboarding", onBoardingRouter);
router.use("/interests", interestRouter);

module.exports = router;
