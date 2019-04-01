const cron = require('node-cron');

const scheduledJobs = [
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  }),
];

module.exports = {
  start: () => scheduledJobs.forEach(x => x.start()),
  stop: () => scheduledJobs.forEach(x => x.stop()),
};
