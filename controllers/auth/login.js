const User = require('../../models/user');
const { errorCatch } = require('../../utils/error-catching');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Email does not correspond to any user.');
      error.statusCode = 401;
      return next(error);
    }

    // check the password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // wrong password
    if (!passwordsMatch) {
      const error = new Error('Wrong password.');
      error.statusCode = 401;
      throw error;
    }

    // correct password
    const token = jwt.sign(
      { // no password here since it's returned to the frontend
        email: user.email,
        userId: user._id.toString()
      },
      'somesupersecret', // secret key only known to the server 
      { expiresIn: '1h' }
    );

    // send token back to the client
    console.log(`User ${user._id} logged in successfully.`);
    res.status(200).json({
      token,
      userId: user._id.toString(),
      expiresIn: '1h'
    });
  } catch (err) {
    errorCatch(err, next);
  }
}