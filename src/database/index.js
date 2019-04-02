const {
  pgHost, pgDatabase, pgUser, pgPassword,
} = require('../config/vars');
const pgp = require('pg-promise')({
  capSQL: true,
});
const symbolCodesManager = require('./managers/symbolcodes');

const cn = {
  host: pgHost,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
};

const db = pgp(cn);

module.exports = {
  symbolCodes: symbolCodesManager(db),
};
