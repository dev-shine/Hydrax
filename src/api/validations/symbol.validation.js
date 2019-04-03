const joi = require('joi');

module.exports = {
  populate: {
    query: {
      exchange: joi.string().required(),
      type: joi.string().required(),
    },
  },
};
