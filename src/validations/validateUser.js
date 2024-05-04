const Joi = require('joi');

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    url_image: Joi.string(),
    dni: Joi.number().integer().min(10000000).max(99999999).required(),
    address: Joi.string().min(5).max(100).required(),
    age: Joi.number().integer().min(16).max(100).required(),
    rank: Joi.number().valid(0, 10).integer(),
    phone_number: Joi.number().min(100000000).max(9999999999).integer().required(),
    is_member: Joi.boolean(),
    deleted: Joi.boolean()
  });

  return schema.validate(user);
};

module.exports = validateUser;