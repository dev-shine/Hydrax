const axios = require('axios');
const axiosRetry = require('axios-retry');
const { eodhdToken } = require('../../config/vars');

const client = axios.create({
  baseURL: 'https://eodhistoricaldata.com/api',
});
axiosRetry(client, { retry: 3 });

const tempToken = 'OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX';
const eohdClient = {
  test: () => client.get(`/real-time/AAPL.US?api_token=${tempToken}&fmt=json`),
};

module.exports = eohdClient;
