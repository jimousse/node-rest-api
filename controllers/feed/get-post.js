const Post = require('../../models/posts');
const { errorCatch } = require('../../utils/error-catching');
const { throwNotFoundError } = require('../../utils/db-not-found-error');

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post
    .findById(postId)
    .then(post => {
      if (!post) throwNotFoundError(postId);
      res.status(200).json({
        message: `Post ${postId} fetched.`,
        post
      });
    })
    .catch(err => errorCatch(err, next))
}