class HttpError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode; 
    }
    toResponse() {
      return {
        status: this.statusCode,
        message: this.message
      };
    }
  }
  
  module.exports = HttpError;