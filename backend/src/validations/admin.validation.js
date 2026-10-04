const Joi = require("joi");

const updateUserRoleSchema = Joi.object({
  role: Joi.string().valid("student", "club").required().messages({
    "any.only": "Role must be either student or club",
    "any.required": "Role is required",
  }),
});

module.exports = updateUserRoleSchema;
