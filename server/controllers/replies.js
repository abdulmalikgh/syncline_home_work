const Replies = require('../models/replies')

const { success, error } = require('../helpers/serverResponse')

module.exports.create = (req, res) => {

    try {
        
        const reply = Replies.create( req.body )

        if(reply) {

            success( res, {message:'Reply created', reply : reply})

        }

    } catch (err) {

        error(res, err)
        
    }
}


module.exports.repliesToUserReport = (req, res) => {

    try {
        
        const replies = Replies.findOne({issueID : req.params.id})

        if(!replies) {
            
            return success( res, "Issue not found", 404)

        }

        return success( res, {message: 'Replies', replies : replies})

    } catch (err) {

        error( res, err)
        
    }
}

