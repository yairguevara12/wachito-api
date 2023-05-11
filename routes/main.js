const { test } = require('../controllers/main');
const { login } = require('../controllers/main');
const { testToken } = require('../controllers/main');

const authMiddleware = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.route('/test').get(test);
router.route('/testToken').get(authMiddleware, testToken);
router.route('/login').post(login);
module.exports = router;