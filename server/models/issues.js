const mongoose = require('mongoose')

const issusSchema = mongoose.Schema({

    userID: {
        type: String,
        required: true
    },

    issueTitle:{
        type: String,
        required: true
    },

    issueBody: {
        type: String,
        required: true
    }

}, 
{
    timestamps: true
})


module.exports = mongoose.model('Issues', issusSchema)