const User = require('../../models/user');
const { validationResult } = require('express-validator');
const { errorCatch } = require('../../utils/error-catching');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
  // validation stuff
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Server side input validation failed.');
    error.data = errors.array();
    return next(error);
  }

  const { email, name, password } = req.body;

  // hash password
  const hash = await bcrypt.hash(password, 12);

  // create user
  const user = new User({
    email,
    name,
    password: hash,
    status: 'I am new!'
  });

  await user.save();

  console.log(`User ${name}, ${email} created successfully.`);
  res.status(201).json({
    message: 'User successfully created',
    userId: user._id
  });
}