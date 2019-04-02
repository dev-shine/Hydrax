const {
  pgHost, pgDatabase, pgUser, pgPassword,
} = require('../config/vars');
const pgp = require('pg-promise')();
const symbolCodesManager = require('./managers/symbolcodes');

const cn = {
  host: pgHost,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
};

const db = pgp(cn);

exports.db = db;

exports.managers = {
  symbolCodes: symbolCodesManager(db),
};
