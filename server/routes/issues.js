const express = require('express')

const { create, issue, issues } = require('../controllers/issues')

const authenticate = require('../middleware/auth')

const issueValidator =  require('../validators/issueValidator')

const router = express.Router()

router.post('/create', authenticate, issueValidator(), create )

router.get('/', issues )

router.get('/:id', authenticate, issue)

module.exports = router