const Users = require('../models/users')

const { resultsValidator } = require('../validators/userAth')

const { success, error } = require('../helpers/serverResponse')

const jwt = require('jsonwebtoken')

const genToken = (userID)=> {
    return jwt.sign({userID}, process.env.JWT_SECRET, { expiresIn: '1h'})
}

module.exports.createUser = async (req, res) => {

    const errors = resultsValidator(req)

    if (errors.length > 0) {
        return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
        })
    }

    try {
        
        const checkUser = await Users.findOne({email : req.body.email})
        
        if(checkUser) {

            return error(res, {

                success: false,

                message: "User already exist"

            }, 409)

        }

        const createUser = await Users.create(req.body)
        
        if(createUser) {

            const createdUser = await (await Users.findOne({ email: createUser.email}))
            
            const token = genToken(user._id)

            const successData = {
                
                token: token,

                message: 'client created',

                user: createdUser

            }

            success(res, successData, 201)
        }

    } catch (err) {

        error(res, error = {

            success: false,

            message: err

        })
        
    }
    
}

module.exports.signin = async (req, res) => {

    try {
        const errors = resultsValidator(req)
        console.log(errors)
        if (errors.length > 0) {
            return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: errors
            })
        }

        const loginUser = await Users.login(req.body.email, req.body.password)
        console.log(loginUser)
        const token = genToken(loginUser._id)

        if(loginUser) {

            const message = {

                message:'Login success',

                token:token,

                user:loginUser

            }

            success(res, message, 200)

        }
        
    } catch (err) {

        console.log(err)
       
    }

}

