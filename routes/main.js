const { test } = require('../controllers/main');
const { login } = require('../controllers/main');

const express = require('express');
const router = express.Router();

router.route('/test').get(test);
router.route('/login').post(login);
module.exports = router;