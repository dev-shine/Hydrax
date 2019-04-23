const eodHandlers = require('../handlers/eod');

const { exchanges, types } = require('../../config/constants')

module.exports = {
 populateSymbol: async () => {
  exchanges.map(async exchange => {
    
    const type = types[exchange]? types[exchange] : 'currency'
    await eodHandlers.exchangeSymbols(exchange, type)
   })
  
 }
};