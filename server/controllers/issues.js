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

        const issue = await Issues.create(req.body)
        console.log('created issue', issue)
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

        const issues = await Issues.find()

        if(issues) {
            
            return success(res, {message:'All issues', issues:issues})
        }
        
    } catch (err) {

        error(res, err)
        
    }

}

module.exports.issue = async (req, res) => {

    try {
        
        const userIssues = await Issues.find({userID: req.params.id})

        if(!userIssues) {
            
             error(res, "User not found", 404)

        }
        console.log(userIssues)
        success(res, {message: 'user issues', issues: userIssues}, 200)

    } catch (err) {
        console.log(err)
        error(res, err)
    }

}

