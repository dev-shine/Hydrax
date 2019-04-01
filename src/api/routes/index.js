const express = require('express');
const eohdClient = require('../../parser/clients/eodhd');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.get('/test', async (req, res) => {
  const result = await eohdClient.test();
  res.send(result.data);
});

module.exports = router;
