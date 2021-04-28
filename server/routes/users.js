const { createUser, signin } = require('../controllers/users')

const { userValidation, userLoginValidation } = require('../validators/userAth')

const express = require('express')

const router = express.Router()

router.post('/create', userValidation() ,createUser)

router.post('/signin', userLoginValidation(), signin )

module.exports = router