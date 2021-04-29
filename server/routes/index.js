const express = require('express')

const app = express()

const userRoute = require('./users')

const issueRoute = require('./issues')

app.use('/user', userRoute)

module.exports = app