const express = require('express')
const router = express.Router()

router.use('/', require('./user_controller'))

module.exports = router
