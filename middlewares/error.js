module.exports = (error, req, res, next) => {
  const { statusCode, message, data } = error;
  console.log(error);
  res.status(statusCode || 500).json({ message, data });
};