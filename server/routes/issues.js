const express = require('express')

const { create, issue, issues, add_reply } = require('../controllers/issues')

const authenticate = require('../middleware/auth')

const issueValidator =  require('../validators/issueValidator')

const router = express.Router()

router.post('/create', authenticate, issueValidator(), create )

router.get('/', issues )

router.get('/:id',authenticate, issue )

router.put('/:id/reply',authenticate, add_reply )

module.exports = router