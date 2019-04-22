const eodHandler = require('../../parser/handlers/eod');
const database = require('../../database');

exports.populate = async (req, res, next) => {
  try {
    await eodHandler.exchangeSymbols(req.query.exchange, req.query.type);
    res.send('OK');
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const symbolCodes = await database.symbols.getAll();
    res.send(symbolCodes);
  } catch (error) {
    next(error);
  }
};
