const User = require('../../models/user');
const { errorCatch } = require('../../utils/error-catching');

exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const status = user.status;
    res.status(200).json({ status });
  } catch (err) {
    errorCatch(err, next);
  }
}