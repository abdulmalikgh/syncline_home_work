const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const { error } = require('../helpers/serverResponse')

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

userSchema.pre('save', async function(next) {
    
    const hashPassword = await bcrypt.hashSync(this.password, 10)

    this.password = hashPassword

    next()

} )

userSchema.statics.login = async function(email, password){

    const user = await this.findOne({ email : email })
  
    if(user) {

        const comparePassword = bcrypt.compare(user.password, password)

        if(comparePassword) {

            return {

                success: true,

                data : user
            }
        }

        return {

            success: false,

            error: "Incorrect email or password"

        }

    }

    return {

        success: false,

        error: "Incorrect email or password"

    }
    

}

module.exports = mongoose.model('Users', userSchema)