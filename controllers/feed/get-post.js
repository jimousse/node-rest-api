const Post = require('../../models/post');
const { errorCatch } = require('../../utils/error-catching');
const { throwNotFoundError } = require('../../utils/db-not-found-error');

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    // get post from db
    const post = await Post.findById(postId);

    // check if it exists
    if (!post) throwNotFoundError(postId);

    // send it back to client
    console.log(`Post ${postId} fetched.`);
    res.status(200).json({
      message: `Post ${postId} fetched.`,
      post
    });
  } catch (err) {
    errorCatch(err, next);
  }
}