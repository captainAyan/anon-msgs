const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^@?(\w){1,15}$/)
    .required(),
  password: Joi.string().min(3).max(30).required(),
});

module.exports = registrationSchema;
