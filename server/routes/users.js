const { createUser } = require('../controllers/users')

const { userValidation } = require('../validators/userAth')

const express = require('express')

const router = express.Router()

router.post('/create',userValidation() ,createUser)

module.exports = router