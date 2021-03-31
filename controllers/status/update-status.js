const User = require('../../models/user');
const { errorCatch } = require('../../utils/error-catching');

exports.updateStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    user.status = newStatus;
    await user.save();
    console.log('Status updated successfully', newStatus);
    res
      .status(200)
      .json({ message: 'Status updated successfully.' });
  } catch (err) {
    errorCatch(err, next);
  }
}