const logger = require('../../config/logger');

const pgp = require('pg-promise')({
  capSQL: true,
});

const tableName = 'symbol_codes';
const cs = new pgp.helpers.ColumnSet(['symbol', 'type', 'exchange', 'service', 'created_at', 'updated_at'], { table: tableName });

module.exports = (db) => {
  return {
    getAll: () => db.any(`select * from ${tableName}`),
    insert: (values, type, service) => {
      const now = new Date();
      values.forEach((x) => {
        x.type = type;
        x.exchange = x.exchange.toUpperCase();
        x.service = service;
        x.created_at = now;
        x.updated_at = now;
      });

      logger.info('insert symbolCode');
      const query = pgp.helpers.insert(values, cs);
      return db.none(query);
    },
  };
};
