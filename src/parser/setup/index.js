const eodHandlers = require('../handlers/eod');

module.exports = {
 populateSymbol: (exchange, type) => {
  eodHandlers.exchangeSymbols(exchange, type)
 }
};