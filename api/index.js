const express = require('express')
const router = express.Router()
const userController = require('./user_controller') // ap

router.use('/characters', require('./character_controller'))
router.use('/dndapi', require('./dndapi_controller'))

router.post('/sign-up', userController.signUp) // ap
router.post('/login', userController.login) // ap

module.exports = router
