const express = require('express');
const controller = require('../controllers/sample.controller');
const validate = require('express-validation');
const validationRules = require('../validations/sample.validation');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.get('/test', validate(validationRules.sampleTest), controller.test);

module.exports = router;
