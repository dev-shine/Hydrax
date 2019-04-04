const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  eodToken: process.env.EOD_TOKEN,
  pgHost: process.env.PG_HOST,
  pgDatabase: process.env.PG_DATABASE,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
};
