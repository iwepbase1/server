const express = require("express");

const StatusCode = {
  SUCCESS: 200,
  CREATED: 201,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  NODATA: 240,
  DATATYPEERROR: 400,
};

module.exports = {StatusCode}