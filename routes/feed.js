const express = require('express');
const router = express.Router();

const postValidators = require('./validators/post');
const feedController = require('../controllers/feed');

router.get('/posts', feedController.getPosts);
router.post('/post', postValidators, feedController.createPost);
router.get('/post/:postId', feedController.getPost);
router.put('/post/:postId', postValidators, feedController.updatePost);

module.exports = router;