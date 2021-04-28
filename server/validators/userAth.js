const { check, validationResult } = require('express-validator')

module.exports.userValidation = (err) => {
    return [
        check('first_name').notEmpty().withMessage("First name is required"),
        check('last_name').notEmpty().withMessage("Last name is required"),
        check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
        check('phone').notEmpty().withMessage("Phone is required"),
        check('password').notEmpty().withMessage("Password is required"),
        check('role').notEmpty().withMessage("Role is required")
    ]
}

module.exports.resultsValidator = (req) => {
    let messages = []
    let object = {msg: ''}
    if(!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for(let i of errors) {
            messages.push(i)
      }
    }
    return messages
  }