const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { errorHandler, withTransaction } = require("../utils");
const { HttpError } = require("../error");
const RefreshToken = require("../models/RefreshToken");
const { StatusCode } = require("../constants");

const register = errorHandler(
  withTransaction(async (req, res, session) => {
    const email = await User.findOne({ email: req.body.email });
    if (email !== null) {
      throw new HttpError(StatusCode.CONFLICT, "Email ID Already Registered");
    }

    const user = User({
      email: req.body.email,
      fullName: req.body.fullName,
      dob: req.body.dob,
      role: req.body.role,
      city: req.body.city,
      country: req.body.country,
      password: await argon2.hash(passwrd),
    });

    await user.save({ session });

    const sanitizedUserData = user.toObject();
    delete sanitizedUserData.password;

    return {
      user: sanitizedUserData,
    };
  })
);

const auth = errorHandler(
  withTransaction(async (req, res, session) => {
    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      return {
        jwt,
        isNewUser: true,
      };
    } else {
      await RefreshToken.deleteOne({ owner: userData._id }, { session });

      const refreshTokenDoc = await RefreshToken({
        owner: userData._id,
      });

      await refreshTokenDoc.save({ session });

      const jwt = createJwt(userData.id);

      const sanitizedUserData = userData.toObject();
      delete sanitizedUserData.password;

      return {
        jwt,
        userData: sanitizedUserData,
      };
    }
  })
);

module.exports = {
  register,
  auth,
};
