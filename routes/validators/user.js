const { body } = require('express-validator');
const User = require('../../models/user');

const userValidators = [
  body('email')
    .isEmail()
    .withMessage('Please, enter a valid email.')
    .custom((value, { req }) => { // check if user exists
      return User
        .findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email address already exists.');
          }
        })
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 }),
  body('name')
    .trim()
    .not().isEmpty()
];

module.exports = userValidators;