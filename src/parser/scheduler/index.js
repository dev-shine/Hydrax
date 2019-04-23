const cron = require('node-cron');

const eodHandlers = require('../handlers/eod');
const setup = require('../setup');

const scheduledJobs = [
  cron.schedule('30 0 * * *', async () => {
    console.log('get daily ohlcvs at 00:30 every day');

    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    prevDate.setHours(0, 0, 0, 0);
    await eodHandlers.dailyOhlcvs('CC', prevDate);
  }),

  cron.schedule('50 * * * * *', async () => {
    
    console.log('get live data every minute at 50 second');
    await eodHandlers.liveStockPrices('CC');
  }),

  cron.schedule('0 12 * * *', async () => {
    console.log('populate symbol_codes db at 12:00 every day');

    setup.populateSymbol()
  }),
];

module.exports = {
  start: () => scheduledJobs.forEach(x => x.start()),
  stop: () => scheduledJobs.forEach(x => x.stop()),
};
