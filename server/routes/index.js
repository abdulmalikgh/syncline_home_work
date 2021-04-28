const express = require('express')

const app = express()

const userRoute = require('./users')

app.use('/user', userRoute)

module.exports = app