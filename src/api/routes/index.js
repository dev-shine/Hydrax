const express = require('express');
const controller = require('../controllers/sample.controller');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.get('/test', controller.test);

module.exports = router;
