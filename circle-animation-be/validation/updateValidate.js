const Joi = require('joi');

const updateValidate = Joi.object({
  beatmap: Joi.string().required(),
  highestCombo: Joi.number().min(0).max(1200).integer().required(),
});

module.exports = updateValidate;
