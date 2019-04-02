const eohdClient = require('../../parser/clients/eodhd');
const database = require('../../database');

exports.test = async (req, res, next) => {
  try {
    // const result = await eohdClient.test();
    // res.send(result.data);
    const result = await database.managers.symbolCodes.get.symbolCodes();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
