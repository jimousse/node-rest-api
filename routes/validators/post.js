const { body } = require('express-validator');

const postValidators = [
  body('title')
    .trim()
    .isLength({ min: 5 }),
  body('title')
    .trim()
    .isLength({ min: 5 }),
];

module.exports = postValidators;