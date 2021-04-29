const Users = require('../models/users')

const jwt = require('jsonwebtoken')

const { error } = require('../helpers/serverResponse')

require('dotenv').config()

const authicateUser = (res, req, next) => {

    let bearer = req.headers.authorization 

    if(!bearer) {

      error(res, "Unauthorized user"  ,401);

      next()

    }

    const token = bearer.split(" ")[1]

    jwt.verify(token, process.env.CLIENT_SECRET, async(err, decodedToken) => {
        console.log(decodedToken)
        if(err) {

             error(res, "Token expires"  ,404)

             next()

        } else {

            const user = Users.findById(decodedToken)
            console.log(user)

            res.user = user

            next()
        }


    })
}

module.exports = authicateUser
