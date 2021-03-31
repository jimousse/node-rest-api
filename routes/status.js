const express = require('express');
const router = express.Router();

const statusController = require('../controllers/status');
const isAuth = require('../middlewares/is-auth');

router.get('/status', isAuth, statusController.getStatus);
router.put('/status', isAuth, statusController.updateStatus);


module.exports = router;