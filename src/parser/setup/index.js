const eodHandlers = require('../handlers/eod');

const { exchanges } = require('../../config/constants')
// Populate database
module.exports = {
 // pupulate symbol_codes table
 populateSymbol: () => {
  exchanges.map(async exchange => {
    await eodHandlers.exchangeSymbols(exchange)
   })
  
 }
};