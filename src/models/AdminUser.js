const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AdminUserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    id : {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
     role: {
      type: String,
      enum: ["ADMIN", "SUPER_ADMIN"],
     },
     password: {
      type: String,
      required: true,
      trim: true,
     }, 
  },
  {
    timestamps: true,
  }
);

AdminUserSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("adminUser", AdminUserSchema);
