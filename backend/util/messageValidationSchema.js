const Joi = require("joi");

const messageSchema = Joi.object({
  username: Joi.string()
    .pattern(/^@?(\w){1,15}$/)
    .required(),
  body: Joi.string().min(1).max(1000).required(),
});

module.exports = messageSchema;
