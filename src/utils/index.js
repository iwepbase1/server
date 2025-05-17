const mongoose = require("mongoose");
const { HttpError } = require("../error");

function errorHandler(fn) {
  return async function (req, res, next) {
    try {
      let nextCalled = false;
      const result = await fn(req, res, (params) => {
        nextCalled = true;
        next(params);
      });
      if (!res.headersSent && !nextCalled) {
        res.json({ status: 200, data: result });
      }
    } catch (e) {
      console.error("Error:", e); // Logs full error to the console
      if (e instanceof HttpError) {
        res.status(e.statusCode).json({ 
          statusCode: e.statusCode, 
          message: e.message, 
          details: e.toResponse() 
        });
      } else {
        res.status(500).json({ 
          statusCode: 500, 
          message: "Internal Server Error",
          error: e.message, 
          stack: e.stack 
        });
      }
    }
  };
}


function withTransaction(fn) {
  return async function (req, res, next) {
    let result;
    await mongoose.connection.transaction(async (session) => {
      result = await fn(req, res, session);
      return result;
    });

    return result;
  };
}

module.exports = {
  errorHandler,
  withTransaction,
};
