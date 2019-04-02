const eohHandler = require('../../parser/handlers/eod');

exports.test = async (req, res, next) => {
  try {
    // await eohHandler.exchangeSymbols(req.query.exchange, req.query.type);
    res.send('OK');
  } catch (error) {
    next(error);
  }
};
