const dbManager = require('../../database');
const logger = require('../../config/logger');
const client = require('../clients/eod');
const { map } = require('lodash');

const serviceName = 'EOD';

module.exports = {
  exchangeSymbols: async (exchange, type) => {
    const symbolsResponse = await client.getExchangeSymbols(exchange);
    const mappedSymbols = map(symbolsResponse.data, (x) => {
      return {
        symbol: x.Code.replace('-', '/'),
        exchange: x.Exchange,
      };
    });
    await dbManager.symbols.insert(mappedSymbols, type, serviceName);
  },

  dailyOhlcvs: async (exchange, date) => {
    const symbolsForExchange = await dbManager.symbols.getForExchange(exchange);
    const symbolsMap = {};
    symbolsForExchange.forEach((x) => {
      symbolsMap[x.symbol] = x.index;
    });

    const response = await client.getDailyOhlcvs(exchange, date);
    const mappedResponse = [];
    response.data.forEach((x) => {
      const symbolIndex = symbolsMap[x.code.replace('-', '/')];
      if (!symbolIndex) {
        logger.error(`Unknown symbol code: ${x.code}`);
        return;
      }

      mappedResponse.push({
        symbol_code_index: symbolIndex,
        open: x.open,
        high: x.high,
        low: x.low,
        close: x.close,
        volume: x.volume,
      });
    });

    if (mappedResponse.length > 0) {
      await dbManager.ohlcvs.insert(mappedResponse, '1d', date);
    } else {
      logger.error('empty mapped response for dailyOhlcvs');
    }
  },
};
