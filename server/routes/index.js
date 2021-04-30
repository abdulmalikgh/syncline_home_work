const express = require('express')

const app = express()

const userRoute = require('./users')

const issuesRoute = require('./issues')

const repliesRoute = require('./replies')

app.use('/user', userRoute)

app.use('/issues', issuesRoute)

app.use('/replies', repliesRoute)

module.exports = app