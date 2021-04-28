const express = require('express')

const app = express()

const cors = require('cors')

const morgan = require('morgan')

const mongo_connection = require('./db_connection/mg_connection')

const appRoutes = require('./routes/index')

require('dotenv').config({
    path: '../config.env'
})

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api', appRoutes)
mongo_connection.connection()
const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`app is listening on http://localhost:${port}`)
})