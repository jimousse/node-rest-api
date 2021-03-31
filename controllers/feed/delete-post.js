const path = require('path');
const Post = require('../../models/post');
const User = require('../../models/user');
const { errorCatch } = require('../../utils/error-catching');
const { deleteFile } = require('../../utils/delete-file');
const { throwNotFoundError } = require('../../utils/db-not-found-error');
const user = require('../../models/user');

function clearImage(_path) {
  if (!_path) return;
  const filePath = path.join(__dirname, '../..', _path);
  deleteFile(filePath);
}

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    // get post by id
    const post = await Post.findById(postId);

    // if not found, throw error
    if (!post) throwNotFoundError(postId);

    // check whether logged in user is creator id
    if (post.creator.toString() !== req.userId) {
      const error = new Error('Not authorized to delete this post.');
      error.statusCode = 403;
      throw error; // here we need to throw to let the catch block deal with the error
    }

    // clear image from server
    clearImage(post.imageUrl);

    // remove post
    await Post.findByIdAndRemove(postId);

    // get user to remove post from it
    const user = await User.findById(req.userId);
    user.posts.pull(postId);

    // save user
    await user.save();

    // send response
    console.log(`Deleted post ${postId} successfully`);
    res.status(200).json({
      message: 'Deleted post successfully.'
    });
  } catch (err) {
    errorCatch(err, next);
  }
}