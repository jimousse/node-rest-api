const { countDocuments } = require('../../models/post');
const Post = require('../../models/post');
const { errorCatch } = require('../../utils/error-catching');

const PER_PAGE = 2;

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    // count posts
    const totalItems = await Post
      .find()
      .countDocuments(); // only count doesn't retrieve

    // retrieve the right amount of posts
    const posts = await Post
      .find()
      .skip((currentPage - 1) * PER_PAGE)
      .limit(PER_PAGE);

    // return them to the client
    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts,
      totalItems,
    });
  } catch (err) {
    errorCatch(err, next);
  }
}