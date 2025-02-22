const Joi = require('joi');

// Middleware to validate user input (Concept #15: Request Body Validation)
exports.validateDocument = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};
