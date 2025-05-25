
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

    await User.updateOne({ email : req.body.email }, { $set: {onBoardingCompleted : true} });

    await form.save({ session });
    
    const sanitizedUserData = form.toObject();

    return {
      form: sanitizedUserData,
    };
  })
);

module.exports = {
  onBoarding,
};
