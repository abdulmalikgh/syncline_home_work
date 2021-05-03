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

        const issues = await Issues.find().select('userID issueTitle issueBody createdAt replies c').populate('userID', 'first_name last_name email phone')

        if(issues) {
            
            return success(res, {message:'All issues', issues:issues}, 200)
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
        success(res, {message: 'user issues', issues: userIssues}, 200)

    } catch (err) {
        console.log(err)
        error(res, err)
    }

}

module.exports.add_reply = async (req, res) => {

    try {

        const checkID = await Issues.findOne({_id:req.params.id})
        
        if(!checkID) {

            success(res, "Issue not found", 404)

            return
        }
      
        const reply = await Issues.findByIdAndUpdate(req.params.id, {

            $push: { replies : {replyBy: req.body.replyBy, reply : req.body.reply}}

        })

       if(reply) {

        const issue = await Issues.findById(req.params.id)
        console.log(req.params.id)
        success(res, {message: 'Repy added successfully', issue: issue }, 200)

       }
        
        
    } catch (err) {
        console.log(err)
        error(res, err)

    }
}

