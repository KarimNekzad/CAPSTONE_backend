const express = require('express')
const router = express.Router()
const models = require('../database/models')

// GET -> Read all
router.get('/', (req, res, next) => {
  models.User.findAll()
    .then((users) => {
      res.status(200).json({
        message: 'Got all users!',
        users,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured getting all users.',
        err,
      })
    })
})

// GET by Pk -> Read by id
router.get('/:id', (req, res, next) => {
  models.User.findByPk(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({
        message: 'Could not find a user with that ID',
      })
    }
    res.status(200).json({
      message: 'Successfully retrieved your user!',
      user,
    })
  })
})

// POST -> Create
router.post('/', (req, res, next) => {
  models.User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((user) => {
      res.status(200).json({
        message: 'Successfully created user!',
        user,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error has occured creating this user.',
        err,
      })
    })
})

// PUT -> Update
router.put('/:id', (req, res, next) => {
  models.User.findByPk(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({
        message: 'Could not find a user by that ID!',
      })
    }

    user.update({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })

    user.save()

    res.status(200).json({
      message: 'Successfully updated user!',
      user,
    })
  })
})

// DELETE -> Delete
router.delete('/:id', (req, res, next) => {
  models.User.findByPk(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({
        message: 'Could not find a user by that ID!',
      })
    }

    user.destroy()

    res.status(200).json({
      message: 'Successfully deleted user!',
    })
  })
})

module.exports = router
