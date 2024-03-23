const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

// Define a simple route for validation
app.post('/', (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error });
  } else {
    console.log('Validation successful', value);
    res.json({ message: 'Validation successful', data: value });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

// Define a route for validation
app.post('/validate', (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.alphanum': 'Username must only contain alpha-numeric characters',
      'string.min': 'Username should have a minimum length of {#limit}',
      'string.max': 'Username should have a maximum length of {#limit}'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address'
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
      'string.pattern.base': 'Password should be alphanumeric with a length between 3 and 30 characters'
    }),
    age: Joi.number().integer().min(18).max(120).required().messages({
      'number.base': 'Age must be a number',
      'number.integer': 'Age must be an integer',
      'number.min': 'Age should be at least {#limit}',
      'number.max': 'Age should not exceed {#limit}'
    }),
    isAdmin: Joi.boolean().required().messages({
      'boolean.base': 'isAdmin must be a boolean value'
    }),
    role: Joi.string().valid('admin', 'user', 'guest').required().messages({
      'any.only': 'Role must be one of "admin", "user", or "guest"'
    }),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      zip: Joi.string().regex(/^\d{5}(?:[-\s]\d{4})?$/).required().messages({
        'string.pattern.base': 'Invalid zip code format'
      })
    }),
    hobbies: Joi.array().items(Joi.string().valid('reading', 'music', 'sports')).min(1).required().messages({
      'array.min': 'Please provide at least one hobby'
    })
  }).options({ abortEarly: false, convert: false });

  const { error, value } = schema.validate(req.body);
  if (error) {
    const errorDetails = error.details.map((detail) => {
      return { message: detail.message, path: detail.path };
    });
    res.status(400).json({ errors: errorDetails });
  } else {
    res.json({ message: 'Validation successful', data: value });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/