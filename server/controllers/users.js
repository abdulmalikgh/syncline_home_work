const Users = require('../models/users')

const { resultsValidator } = require('../validators/userAth')

const { success, error } = require('../helpers/serverResponse')

const jwt = require('jsonwebtoken')

const genToken = (userID)=> {

    return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '12h'})

}

module.exports.createUser = async (req, res) => {
    
    try {

        const errors = resultsValidator(req)

        if (errors.length > 0) {
            return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: errors
            })
        }
        
        const checkUser = await Users.findOne({email : req.body.email})
        
        if(checkUser) {

            return error(res, {

                success: false,

                message: "User already exist"

            }, 409)

        }

        const createUser = await Users.create(req.body)
      
        if(createUser) {

            const createdUser = await Users.findOne({ email: createUser.email})
          
            const token = genToken(createdUser._id)
            
            const successData = {
                
                token: token,

                message: 'user created',

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

        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }

        const userMessage = await Users.login(req.body.email, req.body.password)

        if(userMessage.success === false) {

            return error(res, userMessage, 400)

        }

       

        let token = genToken(userMessage.data._id)
        console.log('token', token, 'secret', process.env.JWT_SECRET)
        success(res, {

            message:'Login success',

            token: token,

            user: userMessage.data

        } , 200)
       
        
    } catch (err) {

        error(res, error = {

            success: false,

            message: err

        })
   
    }

}

module.exports.patients = async (req, res) => {

    try {

        const patients = await Users.find({role: "USER" })
        
        if(patients) {

            const message = {

                message:'All patients',

                users: patients

            } 
            
            success(res, message, 200)

        } 
        
    } catch (err) {

        error(res, error = {

            success: false,

            message: err

        })
        
    }
}

module.exports.doctors = async (req, res) => {

    try {

        const doctors = await Users.find({role: "DOCTOR" })
        
        if(doctors) {

            const message = {

                message:'All docotrs',

                doctors: doctors

            } 
            
            success(res, message, 200)

        } 
        
    } catch (err) {

        error(res, error = {

            success: false,

            message: err

        })
        
    }
}
