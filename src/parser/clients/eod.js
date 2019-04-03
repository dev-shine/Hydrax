const axios = require('axios');
const axiosRetry = require('axios-retry');
const { eodToken } = require('../../config/vars');

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
};
