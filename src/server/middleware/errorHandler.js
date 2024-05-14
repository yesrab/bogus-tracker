const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    msg: "Something went wrong! Please try after some time",
    status: "Error",
  });
};

export default errorHandler;
