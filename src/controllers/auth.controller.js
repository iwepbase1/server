const argon2 = require("argon2");
const User = require("../models/User");
const AdminUser = require("../models/AdminUser");
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
    });
    const jwt = createJwt(user._id);

    await user.save({ session });

    const sanitizedUserData = user.toObject();

    return {
      jwt,
      userData: sanitizedUserData,
    };
  })
);

const adminRegister = errorHandler(
  withTransaction(async (req, res, session) => {
    const email = await AdminUser.findOne({ email: req.body.email });
    if (email !== null) {
      throw new HttpError(StatusCode.CONFLICT, "Email ID Already Registered");
    }

    const data = await (await AdminUser.find()).reverse();
    const lastCreatedId = data[0]?.id;
    const createdID = lastCreatedId != null ? lastCreatedId + 1 : 0;

    const formattedID = String(createdID).padStart(4, "0");

     const passwrd = req.body.password ? req.body.password : "IWEP@123";

    const user = AdminUser({
      userId : "IW" + formattedID,
      email: req.body.email,
      fullName: req.body.fullName,
      role: req.body.role,
      password: await argon2.hash(passwrd),
    });
    const jwt = createJwt(user._id);

    await user.save({ session });

    const sanitizedUserData = user.toObject();

    return {
      jwt,
      userData: sanitizedUserData,
    };
  })
);

const auth = errorHandler(
  withTransaction(async (req, res, session) => {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      return {
        isNewUser: true,
      };
    } else {
      await RefreshToken.deleteOne({ owner: userData._id }, { session });

      const refreshTokenDoc = await RefreshToken({
        owner: userData._id,
      });

      await refreshTokenDoc.save({ session });

      const jwt = createJwt(userData._id);

      const sanitizedUserData = userData.toObject();

      return {
        jwt,
        userData: sanitizedUserData,
      };
    }
  })
);

const adminLogin = errorHandler(
  withTransaction(async (req, res, session) => {
    const userData = await AdminUser.findOne({ userId: req.body.userId });

    if (!userData) {
      throw new HttpError(StatusCode.NOTFOUND, "User ID Doesn't Exists");
    }

    await verifyPassword(userData.password, req.body.password);

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
  })
);

const verifyPassword = async (hashedPassword, rawPassword) => {
  if (await argon2.verify(hashedPassword, rawPassword)) {
    // password matches
  } else {
    throw new HttpError(StatusCode.UNAUTHORIZED, "Incorrect password");
  }
};

function createJwt(id) {
  return jwt.sign({ id }, process.env.TOKEN_KEY);
  
}

module.exports = {
  register,
  auth,
  adminRegister,
  adminLogin
};
