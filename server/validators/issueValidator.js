const { check } = require('express-validator')

const issueValidator = (err) => {

    return [
        check('userID').notEmpty().withMessage("User id is required"),
        check('issueTitle').notEmpty().withMessage('Issue title is required'),
        check('issueBody').notEmpty().withMessage('Issue body/description is required')
    ]
}

module.exports = issueValidator

