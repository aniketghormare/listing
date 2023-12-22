const { body, validationResult } = require('express-validator')
const userValidationRules = (method) => {
  switch (method) {
    case 'createbrand': {
      return [
        body('title', 'Title field is required').notEmpty(),
        body('seller', 'seller field is required').notEmpty(),
        body('brand', 'brand field is required').notEmpty(),
        body('moq', 'moq field is required').notEmpty(),
        body('price', 'price field is required').notEmpty(),
        body('rating', 'Rating field is required').notEmpty(),
        body('image', 'Rating field is required').notEmpty()
      ]
    };
    case 'updatebrand': {
        return [
        body('name', 'Name field is required').notEmpty(),
         body('id', 'admin id is required should integer for update').notEmpty().isInt(),
        ]
      }
  }

}

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}