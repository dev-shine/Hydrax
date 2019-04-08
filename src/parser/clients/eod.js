const axios = require('axios');
const axiosRetry = require('axios-retry');
const { eodToken } = require('../../config/vars');
const moment = require('moment');
const _ = require('lodash');

const client = axios.create({
  baseURL: 'https://eodhistoricaldata.com/api',
});

axiosRetry(client, { retries: 3 });

function getParams() {
  return {
    api_token: eodToken,
    fmt: 'json',
  };
}

module.exports = {
  getExchangeSymbols: exchange => client.get(`exchanges/${exchange}`, { params: getParams() }),

  getDailyOhlcvs: (exchange, date) => {
    const params = getParams();
    params.date = moment(date).format('YYYY-MM-DD');
    return client.get(`eod-bulk-last-day/${exchange}`, { params });
  },

  getLiveStockPrices: (exchange, symbols) => {
    const params = getParams();
    const fmt = x => `${x.symbol}.${exchange}`;
    if (symbols.length > 1) {
      params.s = _.map(_.slice(symbols, 1, symbols.length), fmt).join(',');
    }

    return client.get(`real-time/${fmt(symbols[0])}`, { params });
  },
};
