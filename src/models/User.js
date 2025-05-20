const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Home Maker", "Business Woman", "Employed", "Other"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("User", UserSchema);
