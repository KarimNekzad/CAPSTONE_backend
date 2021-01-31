const express = require('express')
const router = express.Router()
const models = require('../database/models')

// user auth
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { route } = require('../api/dndapi_controller')

// user auth sign up
router.post('/sign-up', (req, res, next) => {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((email) => {
      if (email) {
        res.status(409).json({
          message: 'Sorry! That email already exists!',
        })
      }

      // encrypts passowrd:
      // generate random string to attach
      bcryptjs.genSalt(10, (err, salt) => {
        // generate random hash from password + string and use that as password
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
          models.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
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
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error has occured creating this user.',
        err,
      })
    })
})

// user auth login
router.post('/login', (req, res, next) => {
  console.log('req.body in user login:', req.body)
  models.User.findOne({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: 'A user with that username or email does not exist!',
        })
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              'secret',
              (err, token) => {
                res.status(200).json({
                  message: 'Authentication successful!',
                  userId: user.id,
                  username: user.username,
                  email: user.email,
                  token,
                })
              }
            )
          } else {
            res.status(401).json({
              message: 'Wrong password!',
            })
          }
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something went wrong while trying to log you in.',
      })
    })
})

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

// // GET by Pk -> Read by id
// router.get('/:id', (req, res, next) => {
//   models.User.findByPk(req.params.id).then((user) => {
//     if (!user) {
//       res.status(404).json({
//         message: 'Could not find a user with that ID',
//       })
//     }
//     res.status(200).json({
//       message: 'Successfully retrieved your user!',
//       user,
//     })
//   })
// })

// // POST -> Create
// router.post('/', (req, res, next) => {
//   models.User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   })
//     .then((user) => {
//       res.status(200).json({
//         message: 'Successfully created user!',
//         user,
//       })
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: 'An error has occured creating this user.',
//         err,
//       })
//     })
// })

// PUT -> Update
router.put('/update/:id', (req, res, next) => {
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
router.delete('/delete:id', (req, res, next) => {
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
