const express = require('express')
const router = express.Router()

router.use('/characters', require('./character_controller'))
// router.use('/users', require('../user/user_controller'))
router.use('/dndapi', require('./dndapi_controller'))

module.exports = router
