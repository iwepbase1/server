const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);