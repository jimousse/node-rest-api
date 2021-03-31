const { getPosts } = require('./feed/get-posts');
const { createPost } = require('./feed/create-post');
const { getPost } = require('./feed/get-post');
const { updatePost } = require('./feed/update-post');
const { deletePost } = require('./feed/delete-post');

exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;