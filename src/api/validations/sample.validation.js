const joi = require('joi');

module.exports = {
  sampleTest: {
    query: {
      exchange: joi.string().required(),
      type: joi.string().required(),
    },
  },
};
