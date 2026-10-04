const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 30 characters",
    "any.required": "Password is required",
  }),
});

const updateInterestsSchema = Joi.object({
  interests: Joi.array().items(Joi.string().trim().min(1)).min(1).required().messages({
    "array.base": "Interests must be an array",
    "array.min": "Please select at least one interest",
    "any.required": "Interests are required",
    "array.includes": "Each interest must be a valid string",
  }),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).max(30).required().messages({
    "string.empty": "Current password is required",
    "string.min": "Current password must be at least 6 characters",
    "string.max": "Current password cannot exceed 30 characters",
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(6).max(30).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 6 characters",
    "string.max": "New password cannot exceed 30 characters",
    "any.required": "New password is required",
  }),
});

module.exports = {
  loginSchema,
  updateInterestsSchema,
  updateProfileSchema,
  changePasswordSchema,
};
