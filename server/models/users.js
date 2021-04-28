const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next) {
    
    const password = bcrypt.hashSync(this.password, 10)

    this.password = password

    next()

} )

userSchema.statics.login = async function(email, password){

   const user = await this.findOne({ email : email })

   if(user) {

    const auth = bcrypt.compare(user.password, password)

    if(auth) {

        return user 
    }

    throw Error("Incorrect Password")

    } 

    throw Error("Incorrect Email")

}

module.exports = mongoose.model('Users', userSchema)