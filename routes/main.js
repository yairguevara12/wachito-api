const { test } = require('../controllers/main');
const express = require('express');
const router = express.Router();

router.route('/test').get(test);

module.exports = router;