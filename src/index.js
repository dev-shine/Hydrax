const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const scheduler = require('./parser/scheduler');
// listen to requests
app.listen(port, () => {
  logger.info(`server started on port ${port} (${env})`)
});

scheduler.start();

/**
* Exports express
* @public
*/
module.exports = app;
