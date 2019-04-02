const logger = require('../../config/logger');

function manager(db) {
  return {
    get: {
      symbolCodes: () => db.any('select * from symbol_codes'),
    },
    insert: {
      symbolCode: (symbol, type, exchange, service) => {
        logger.info('insert symbolCode');
        return db.none('insert into symbol_codes(symbol, type, exchange, service, created_at, updated_at) ' +
          'values($1, $2, $3, $4, $5, $5)', [symbol, type, exchange, service, new Date()]);
      },
    },
  };
}

module.exports = manager;
