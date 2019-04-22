const {
  pgHost, pgDatabase, pgUser, pgPassword,
} = require('../config/vars');
const pgp = require('pg-promise')({
  capSQL: true,
});
const symbolsManager = require('./managers/symbols');
const ohlcvsManager = require('./managers/ohlcvs');

const cn = {
  host: pgHost,
  port: 5432,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
};

const db = pgp(cn);

module.exports = {
  symbols: symbolsManager(db),
  ohlcvs: ohlcvsManager(db),
};
