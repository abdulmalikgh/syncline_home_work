const Users = require('../models/users')

const { resultsValidator } = require('../validators/userAth')

const { success, error } = require('../helpers/serverResponse')

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
        console.log(checkUser)
        if(checkUser) {

            return error(res, {

                success: false,

                message: "User already exist"

            }, 409)

        }

        const createUser = await Users.create(req.body)
        
        if(createUser) {

            const createdUser = await (await Users.findOne({ email: createUser.email}))

            const successData = {

                success: true,

                message: 'client created',

                client: createdUser

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