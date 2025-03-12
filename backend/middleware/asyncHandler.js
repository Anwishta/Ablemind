const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (!res.headersSent) {
        const statuscode = res.statusCode;
        res.status(statuscode).json({ message: error.message });
      }
    });
  };
  
  export default asyncHandler;
  