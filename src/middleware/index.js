const { HttpError } = require("../error");
const { errorHandler } = require("../utils");
const multer = require('multer')
const path = require('path')
const jwt = require("jsonwebtoken");

const verifyAccessToken = errorHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new HttpError(401, "Unauthorized");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.id = decodedToken.id;
    next();
  } catch (e) {
    throw new HttpError(401, "Unauthorized");
  }
});

const storage = multer.diskStorage({
  destination : function(req, file, callBack){
    callBack(null,'src/uploads/')
  },
  filename: function(req, file, callBack) {
    let ext = path.extname(file.originalname)
    callBack(null, Date.now()+ ext)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.docx'];
  const ext = path.extname(file.originalname);
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PDF, DOCX and PNG files are allowed.'));
  }
};

const upload = multer({
  storage : storage,
  fileFilter : fileFilter,
  limits : {
    fieldSize : 1024 * 1024 * 2
  }
})


module.exports = {
  verifyAccessToken,
  upload
};