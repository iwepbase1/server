
const User = require("../models/User");
const InterestFormSchema = require("../models/InterestForm");
const { errorHandler, withTransaction } = require("../utils");
const { HttpError } = require("../error");
const { StatusCode } = require("../constants");

const onBoarding = errorHandler(
  withTransaction(async (req, res, session) => {
    const email = await InterestFormSchema.findOne({ email: req.body.email });
    if (email !== null) {
      throw new HttpError(StatusCode.CONFLICT, "User Already Onboarded");
    }

    const form = InterestFormSchema({
     ...req.body,
      submittedAt: new Date(),
    });

    await form.save({ session });
    
    await User.updateOne({ email }, { $set: {onBoardingCompleted : true} });

    const sanitizedUserData = form.toObject();

    return {
      user: sanitizedUserData,
    };
  })
);

module.exports = {
  onBoarding,
};
