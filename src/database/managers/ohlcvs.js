const logger = require('../../config/logger');

const pgp = require('pg-promise')({
  capSQL: true,
});

const tableName = 'ohlcvs';
const cs = new pgp.helpers.ColumnSet([
  'symbol_code_index', 'period', 'timestamp', 'open', 'high', 'low', 'close', 'volume', 'created_at', 'updated_at',
], { table: tableName });

module.exports = (db) => {
  return {
    getAll: () => db.any(`select * from ${tableName}`),
    insert: (values, period, startDate) => {
      const now = new Date();
      values.forEach((x) => {
        x.period = period;
        x.timestamp = startDate;
        x.created_at = now;
        x.updated_at = now;
      });

      logger.info(`insert ohlcvs for ${period}`);
      const query = pgp.helpers.insert(values, cs);
      return db.none(query);
    },
  };
};
