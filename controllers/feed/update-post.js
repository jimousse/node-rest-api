const { validationResult } = require('express-validator');
const { throwNotFoundError } = require('../../utils/db-not-found-error');
const { deleteFile } = require('../../utils/delete-file');
const { errorCatch } = require('../../utils/error-catching');
const path = require('path');

const Post = require('../../models/post');

function clearImage(_path) {
  const filePath = path.join(__dirname, '../..', _path);
  deleteFile(filePath);
}

exports.updatePost = async (req, res, next) => {
  // validation stuff
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Server side input validation failed.');
    error.data = errors.array();
    return next(error);
  }

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

  try {
    const post = await Post.findById(postId);
    if (!post) throwNotFoundError(postId);

    // check whether logged in user is creator id
    if (post.creator.toString() !== req.userId) {
      const error = new Error('Not authorized to modify this post.');
      error.statusCode = 403;
      throw error; // here we need to throw to let the catch block deal with the error
    }

    // clean image if new image
    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl);
    }

    // update post
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    // save post
    await post.save();

    console.log('Post updated successfully', postId);
    res
      .status(200)
      .json({
        message: 'Post updated successfully.',
        post
      });

  } catch (err) {
    errorCatch(err, next)
  }
}