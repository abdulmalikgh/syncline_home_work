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

    // try {
    //     const id = req.params.id 

    //     const replies = Replies.find({issueID : id})

    //     if(!replies) {
            
    //         success( res, "Issue not found", 404)

    //     }

    //     success( res, {message: 'Replies', replies : replies})

    // } catch (err) {

    //     error( res, err)
        
    // }
}

