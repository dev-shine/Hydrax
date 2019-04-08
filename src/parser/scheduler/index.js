const cron = require('node-cron');

const eodHandlers = require('../handlers/eod');

const scheduledJobs = [
  cron.schedule('30 0 * * *', async () => {
    console.log('get daily ohlcvs at 00:30 every day');

    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    prevDate.setHours(0, 0, 0, 0);
    await eodHandlers.dailyOhlcvs('CC', prevDate);
  }),

  cron.schedule('10 * * * * *', async () => {
    console.log('get live data every minute at 10 second');
    await eodHandlers.liveStockPrices('CC');
  }),
];

module.exports = {
  start: () => scheduledJobs.forEach(x => x.start()),
  stop: () => scheduledJobs.forEach(x => x.stop()),
};
