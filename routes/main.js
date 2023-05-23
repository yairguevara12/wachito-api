const { test } = require('../controllers/main');
const { login } = require('../controllers/main');
const { validateToken } = require('../controllers/main');
const { register } = require('../controllers/main');
const authMiddleware = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.route('/test').get(test);
router.route('/validateToken').get(authMiddleware, validateToken);
router.route('/login').post(login);
//router.route('/logout').get(authMiddleware, logout);
router.route('/register').post(register);
module.exports = router;