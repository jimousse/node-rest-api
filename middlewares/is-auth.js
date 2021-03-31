const jwt = require('jsonwebtoken');
const { errorCatch } = require('../utils/error-catching');

module.exports = (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    return next(error);
  }
  const token = header.split(' ')[1]; // Bearer token
  let decodedToken;
  try {
    decodedToken = jwt.decode(token, 'somesupersecret');
  } catch (err) {
    return errorCatch(err, next);
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 400;
    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};