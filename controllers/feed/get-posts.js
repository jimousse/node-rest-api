const Post = require('../../models/posts');
const { errorCatch } = require('../../utils/error-catching');

exports.getPosts = (req, res, next) => {
  Post
    .find()
    .then(posts => {
      return res.status(200).json({
        message: 'Fetched posts successfully.',
        posts
      });
    })
    .catch(err => errorCatch(err, next));
}