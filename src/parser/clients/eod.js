const axios = require('axios');
const axiosRetry = require('axios-retry');
const { eodToken } = require('../../config/vars');
const moment = require('moment');

const client = axios.create({
  baseURL: 'https://eodhistoricaldata.com/api',
});

axiosRetry(client, { retry: 3 });

module.exports = {
  getExchangeSymbols: exchange => client.get(`exchanges/${exchange}`, {
    params: {
      api_token: eodToken,
      fmt: 'json',
    },
  }),

  getDailyOhlcvs: (exchange, date) => {
    return client.get(`eod-bulk-last-day/${exchange}`, {
      params: {
        date: moment(date).format('YYYY-MM-DD'),
        api_token: eodToken,
        fmt: 'json',
      },
    });
  },
};
