const Joi = require("joi");

const INTEREST_OPTIONS = [
  "Coding",
  "AI",
  "Web Development",
  "Cyber Security",
  "Sports",
  "Music",
  "Photography",
  "Business",
  "Design",
  "Robotics",
];

const createEventSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Event title is required",
    "string.min": "Event title must be at least 3 characters",
    "string.max": "Event title cannot exceed 100 characters",
    "any.required": "Event title is required",
  }),
  description: Joi.string().trim().min(10).max(2000).required().messages({
    "string.empty": "Event description is required",
    "string.min": "Event description must be at least 10 characters",
    "string.max": "Event description cannot exceed 2000 characters",
    "any.required": "Event description is required",
  }),
  category: Joi.string()
    .valid(
      "Academic",
      "Workshop",
      "Technology",
      "Social",
      "Sports",
      "Music",
      "Business",
      "Arts",
    )
    .required()
    .messages({
      "any.only": "Invalid event category",
      "any.required": "Event category is required",
    }),
  tags: Joi.array()
    .items(Joi.string().valid(...INTEREST_OPTIONS))
    .default([])
    .messages({
      "array.base": "Tags must be an array",
      "any.only": "Invalid event interest tag",
    }),
  date: Joi.date().iso().required().messages({
    "date.base": "Please provide a valid event date",
    "date.format": "Event date must be in valid ISO format",
    "any.required": "Event date is required",
  }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Start time must be in HH:mm format",
      "any.required": "Start time is required",
    }),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "End time must be in HH:mm format",
      "any.required": "End time is required",
    }),

  venue: Joi.string().trim().min(2).max(200).required().messages({
    "string.empty": "Event venue is required",
    "string.min": "Venue must be at least 2 characters",
    "string.max": "Venue cannot exceed 200 characters",
    "any.required": "Event venue is required",
  }),

  maxParticipants: Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .required()
    .messages({
      "number.base": "Maximum participants must be a number",
      "number.integer": "Maximum participants must be a whole number",
      "number.min": "Maximum participants must be at least 1",
      "number.max": "Maximum participants cannot exceed 10000",
      "any.required": "Maximum participants is required",
    })
    .custom((event, helpers) => {
      if (event.startTime >= event.endTime) {
        return helpers.message({
          custom: "End time must be after start time",
        });
      }

      return event;
    }),
});

module.exports = createEventSchema;
