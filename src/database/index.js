const {
  pgHost, pgDatabase, pgUser, pgPassword,
} = require('../config/vars');
const pgp = require('pg-promise')();

const cn = {
  host: pgHost,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
};

const db = pgp(cn);

exports.db = db;

exports.queries = {
  symbolCodes: {
    getSymbolCodes: () => db.any('select * from symbol_codes'),
    addSymbolCode: (symbol, type, exchange, service) => {
      return db.none('insert into symbol_codes(symbol, type, exchange, service, created_at, updated_at) ' +
        'values($1, $2, $3, $4, $5, $5)', [symbol, type, exchange, service, new Date()]);
    },
  },
};
