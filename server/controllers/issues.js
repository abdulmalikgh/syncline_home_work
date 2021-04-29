const Issues = require('../models/issues')

const {success, error} = require('../helpers/serverResponse')

const { resultsValidator } = require('../validators/userAth')

module.exports.create = async (req, res) => {

    try {

        const errors = resultsValidator(req)

        if (errors.length > 0) {
            return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: errors
            })
        }

        const issue = Issues.create(req.body)

        if(issue) {

            success(res, {
                message:'issue created',
                issue: issue
            }, 201)
            
        }
        
    } catch (err) {

        error(res, error);

    }

}

module.exports.issues = async (req, res) => {

    try {

        const issues = Issues.find()

        if(issues) {
            
            return success(res, {message:'All issues', issues:issues})
        }
        
    } catch (err) {

        error(res, err)
        
    }

}

module.exports.issue = async (req, res) => {

    try {
        
        const userIssues = Issues.findById(req.body.id)

        if(!userIssues) {
            
            return error(res, "User not found", 404)

        }

        return success(res, {message: 'user issues', issues: userIssues})

    } catch (err) {
        
        error(res, err)
    }

}

