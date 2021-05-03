const express = require('express')

const router = express.Router()

const authenticate = require('../middleware/auth')

const { create, repliesToUserReport } = require('../controllers/replies')

router.post('/create', authenticate, create)

router.get('/:id', authenticate, repliesToUserReport)

module.exports = router