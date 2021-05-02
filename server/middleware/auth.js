const Users = require('../models/users')

const jwt = require('jsonwebtoken')

const { error } = require('../helpers/serverResponse')

require('dotenv').config()

const authenticateUser = async (req, res, next) => {

    try {

        const token = req.headers.authorization

        if(token) {
            
            let bearerToken = token.split(" ")[1]
            console.log('token', token, 'secret', process.env.JWT_SECRET)
            jwt.verify(bearerToken, process.env.JWT_SECRET, async function(err, decode){
                
                if(err) {
                    error(res, err.message, 401)  
                } else {
                    console.log(decode)
                    let user = await Users.findById(decode.id)

                    res.locals.user = user

                    next()
                }
            })
        }
        
    } catch (err) {
        console.log('eroror', err)
        error(res, err, 401)
        
    }

}

module.exports = authenticateUser
