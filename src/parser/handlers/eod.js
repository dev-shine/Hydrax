const dbManager = require('../../database');
const client = require('../clients/eod');
const { map } = require('lodash');

const serviceName = 'EOD';

exports.exchangeSymbols = async (exchange, type) => {
  const symbolsResponse = await client.getExchangeSymbols(exchange);
  const mappedSymbols = map(symbolsResponse.data, (x) => {
    return {
      symbol: x.Code.replace('-', '/'),
      exchange: x.Exchange,
    };
  });
  await dbManager.symbols.insert(mappedSymbols, type, serviceName);
};
