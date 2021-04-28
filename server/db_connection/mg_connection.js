const mongoose = require('mongoose')

require('dotenv').config()

const mg_connection = () => {

      return  mongoose.connect(process.env.MONGODB_URI,{
           useNewUrlParser: true, 
           useUnifiedTopology: true 
        }, (err) => {
            if(err) console.log(err)
            console.log("database connection established")
        })
    
}

module.exports = mg_connection