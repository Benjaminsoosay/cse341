const { body, validationResult } = require("express-validator");

const courseValidationRules = () => [
  body("title").notEmpty().withMessage("Title is required"),
  body("code").notEmpty().withMessage("Course code is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { courseValidationRules, validate };
