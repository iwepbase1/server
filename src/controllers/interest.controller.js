
const InterestFormSchema = require("../models/InterestForm");
const { errorHandler } = require("../utils");

const getAllInterest = errorHandler(async (req, res) => {
    const insterestRecieved = await InterestFormSchema.find();

    return {
     insterestRecieved
    };
  }
);

module.exports = {
  getAllInterest,
};
