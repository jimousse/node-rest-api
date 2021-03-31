const express = require('express');
const router = express.Router();

const postValidators = require('./validators/post');
const feedController = require('../controllers/feed');
const isAuth = require('../middlewares/is-auth');

router.get('/posts', isAuth, feedController.getPosts);
router.post('/post', isAuth, postValidators, feedController.createPost);
router.get('/post/:postId', isAuth, feedController.getPost);
router.put('/post/:postId', isAuth, postValidators, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;