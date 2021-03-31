const { validationResult } = require('express-validator');
const Post = require('../../models/post');
const User = require('../../models/user');
const { errorCatch } = require('../../utils/error-catching');


exports.createPost = async (req, res, next) => {
  // validation stuff
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Server side input validation failed.');
    error.data = errors.array();
    return next(error);
  }

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
    creator: req.userId
  });
  try {
    // save post
    await post.save();

    // retrieve the creator of the post
    const creator = await User.findById(req.userId);

    // add post to its posts
    creator.posts.push(post);

    // save back the user
    await creator.save();

    console.log('Saved post successfully.');

    res.status(201).json({
      message: 'Post created successfully.',
      post,
      creator: {
        _id: creator._id,
        name: creator.name
      }
    });

  } catch (err) {
    errorCatch(err, next);
  }
}