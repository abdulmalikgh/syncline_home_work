const { createUser, signin, patients, doctors } = require('../controllers/users')

const { userValidation, userLoginValidation } = require('../validators/userAth')

const express = require('express')

const router = express.Router()

router.post('/create', userValidation() ,createUser )

router.post('/signin', userLoginValidation(), signin )

router.get('/all', patients)

router.get('/doctors', doctors)

module.exports = router