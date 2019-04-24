const dbManager = require('../../database');
const logger = require('../../config/logger');
const client = require('../clients/eod');
const moment = require('moment');
const _ = require('lodash');

const { types } = require('../../config/constants')
const serviceName = 'EOD';

function getSymbolsMap(symbolsForExchange) {
  const symbolsMap = {};
  _.forEach(symbolsForExchange, (x) => {
    symbolsMap[x.symbol] = x.index;
  });
  return symbolsMap;
}

module.exports = {
  // handler for symbols_codes population
  exchangeSymbols: async (exchange) => {
    // check type of exchange 
    const type = types[exchange]? types[exchange] : 'currency'

    const symbolsResponse = await client.getExchangeSymbols(exchange);
    let mappedSymbols = _.map(symbolsResponse.data, (x) => {
      return {
        type,
        symbol: x.Code.replace('-', '/'),
        exchange: x.Exchange,
      };
    });
    // check unique of table fields combination / reject record which is same with current in table
    mappedSymbols = mappedSymbols.filter(x => x.exchange !== null)
    const currentSymbolsKeys = await dbManager.symbols.getForExchange(exchange)
    const filteredSymbols = currentSymbolsKeys.map(x => x.symbol + x.exchange + x.type + x.service)
    const filteredMappedSymbols = mappedSymbols.filter(x => filteredSymbols.indexOf(x.symbol + x.exchange + x.type + serviceName) < 0)

    if (filteredMappedSymbols.length > 0) await dbManager.symbols.insert(filteredMappedSymbols, serviceName);
    
  },
  // handler for fetch / update bulk api eod daily
  dailyOhlcvs: async (exchange, date) => {
    const symbolsForExchange = await dbManager.symbols.getForExchange(exchange);
    const symbolsMap = getSymbolsMap(symbolsForExchange);
    const response = await client.getDailyOhlcvs(exchange, date);
    const mappedResponse = [];
    _.forEach(response.data, (x) => {
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
        timestamp: date,
      });
    });

    if (mappedResponse.length > 0) {
      await dbManager.ohlcvs.insert(mappedResponse, '1d');
    } else {
      logger.error('empty mapped response for dailyOhlcvs');
    }
  },
  // handler for fetch / update live stocks api daily
  liveStockPrices: async (exchange) => {
    const symbolsForExchange = await dbManager.symbols.getForExchange(exchange);
    const symbolsMap = getSymbolsMap(symbolsForExchange);
    _.forEach(symbolsForExchange, (x) => {
      x.symbol = x.symbol.replace('/', '-');
    });
    const symbolChunks = _.chunk(symbolsForExchange, 10); // recommended value is < 15
    await Promise.all(symbolChunks.map(async (chunk) => {
      const response = await client.getLiveStockPrices(exchange, chunk);
      const mappedResponse = [];
      const handleItem = (x) => {
        if (!Number.isInteger(x.timestamp) || x.timestamp === 0) {
          logger.warn(`no liveStockPrices data for ${x.code}`);
          return;
        }

        const symbolIndex = symbolsMap[x.code.split('.')[0].replace('-', '/')];
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
          timestamp: moment.unix(x.timestamp).toDate(),
        });
      };

      if (Array.isArray(response.data)) {
        _.forEach(response.data, handleItem);
      } else {
        handleItem(response.data);
      }
      if (mappedResponse.length > 0) {
        await dbManager.ohlcvs.insert(mappedResponse, '1m');
      } else {
        logger.error('empty mapped response for liveStockPrices');
      }
    }));
  },
};
