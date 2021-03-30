const { getPosts } = require('./feed/get-posts');
const { createPost } = require('./feed/create-post');
const { getPost } = require('./feed/get-post');
const { updatePost } = require('./feed/update-post');

exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;