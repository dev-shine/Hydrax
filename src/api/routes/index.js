const express = require('express');
const symbolRoutes = require('./symbol.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/symbols', symbolRoutes);

module.exports = router;
