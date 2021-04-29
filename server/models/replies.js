const mongoose = require('mongoose')

const replySchema = require({

    issueID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Issues', 
        required: true,
    },

    repliedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users', 
        required: true, 
    },

    reply: {
        type: String,
        required: true
    }
    
}, {
    timestamp: true
})


module.exports = mongoose.model('Replies', replySchema)