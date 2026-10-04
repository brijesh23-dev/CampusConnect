const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        success: err.success,
        message: err.message,
      });
    }
  }

  return res.status(500).json({
    success:false,
    message: "something went wrong on the server",
  });
};


module.exports = errorHandler;