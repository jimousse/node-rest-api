const { validationResult } = require('express-validator');
const Post = require('../../models/posts');
const { errorCatch } = require('../../utils/error-catching');
const { throwValidationError } = require('../../utils/validation-error');


exports.createPost = (req, res, next) => {
  if (!validationResult(req).isEmpty()) throwValidationError();
  // look for an image
  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace(/\\/g, "/"); // windows 🤷
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
    imageUrl,
    creator: { name: 'Jimmy' }
  });
  post
    .save()
    .then(result => {
      console.log('Saving', result);
      res.status(201).json({
        message: 'Post created successfully.',
        post: result
      });
    })
    .catch(err => errorCatch(err, next));
}