const express = require('express');
const controller = require('../controllers/symbol.controller');
const validate = require('express-validation');
const validation = require('../validations/symbol.validation');

const router = express.Router();

router.route('/populate')
  .get(validate(validation.populate), controller.populate);

router.route('/')
  .get(controller.get);

module.exports = router;
