const Joi = require("joi");

const updateClubProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required().messages({
    "string.empty": "Club name is required",
    "string.min": "Club name must be at least 2 characters",
    "string.max": "Club name cannot exceed 80 characters",
    "any.required": "Club name is required",
  }),
  description: Joi.string().trim().max(1000).allow("").optional().messages({
    "string.max": "Description cannot exceed 1000 characters",
  }),
  category: Joi.string().trim().max(100).allow("").optional().messages({
    "string.max": "Category cannot exceed 100 characters",
  }),
  website: Joi.string().trim().allow("").optional().max(200).messages({
    "string.max": "Website cannot exceed 200 characters",
  }),
});

module.exports = updateClubProfileSchema;
