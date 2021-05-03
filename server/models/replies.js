const mongoose = require('mongoose')

const replySchema = mongoose.Schema({

    issueID: {
        type: String,
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
    
},
 {
    timestamp: true
})


module.exports = mongoose.model('Replies', replySchema)