import Joi from "joi";

export const joi_Schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'string.empty': 'Email is required'
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required'
  }),

  name: Joi.string().min(3).required().messages({
    'string.min': 'Name must be at least 3 characters',
    'string.empty': 'Name is required'
  }),

  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'Phone number must be exactly 11 digits',
      'string.pattern.base': 'Phone number must contain only digits',
      'string.empty': 'Phone number is required'
    }),

    role: Joi.string().required()
});


