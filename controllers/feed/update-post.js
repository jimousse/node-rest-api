const { validationResult } = require('express-validator');
const { throwValidationError } = require('../../utils/validation-error');
const { throwNotFoundError } = require('../../utils/db-not-found-error');
const { deleteFile } = require('../../utils/delete-file');
const { errorCatch } = require('../../utils/error-catching');
const path = require('path');

const Post = require('../../models/posts');

function clearImage(_path) {
  const filePath = path.join(__dirname, '../..', _path);
  deleteFile(filePath);
}

exports.updatePost = (req, res, next) => {
  if (!validationResult(req).isEmpty()) throwValidationError();
  const postId = req.params.postId;
  const { content, title } = req.body;
  let imageUrl = req.body.image;
  // if new file is uploaded, replace the image url
  if (req.file) {
    imageUrl = req.file.path.replace(/\\/g, "/"); // windows 🤷
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) throwNotFoundError(postId);
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then(post => {
      console.log('Post updated successfully', postId);
      res.status(200).json({ message: 'Post updated successfully.', post });
    })
    .catch(err => errorCatch(err, next))
}