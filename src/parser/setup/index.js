const eodHandlers = require('../handlers/eod');

const { exchanges, types } = require('../../config/constants')
// Populate database
module.exports = {
 // pupulate symbol_codes table
 populateSymbol: async () => {
  exchanges.map(async exchange => {
    // check type of exchange 
    const type = types[exchange]? types[exchange] : 'currency'
    await eodHandlers.exchangeSymbols(exchange, type)
   })
  
 }
};