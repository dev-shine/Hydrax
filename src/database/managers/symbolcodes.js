const logger = require('../../config/logger');

const pgp = require('pg-promise')({
  capSQL: true,
});

const cs = new pgp.helpers.ColumnSet(['symbol', 'type', 'exchange', 'service', 'created_at', 'updated_at'], { table: 'symbol_codes' });

module.exports = (db) => {
  return {
    getAll: () => db.any('select * from symbol_codes'),
    insert: (values) => {
      const now = new Date();
      values.forEach((x) => {
        x.created_at = now;
        x.updated_at = now;
      });

      logger.info('insert symbolCode');
      const query = pgp.helpers.insert(values, cs);
      return db.none(query);
    },
  };
};
