const express = require('express')
const router = express.Router()
const models = require('../database/models')
// user auth middleware
const checkAuthMiddleware = require('../middleware/check-auth')

// GET -> Read all
router.get('/', (req, res, next) => {
  models.Character.findAll({ where: { userId: null } })
    .then((characters) => {
      res.status(200).json({
        message: 'Got all characters!',
        characters,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured getting all characters.',
        err,
      })
    })
})

// GET -> Read all for Users
router.get('/user/:id', (req, res, next) => {
  models.Character.findAll({ where: { userId: req.params.id } })
    .then((characters) => {
      res.status(200).json({
        message: 'Got all characters!',
        characters,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured getting all characters.',
        err,
      })
    })
})

// GET -> Find One
router.get('/:id', (req, res, next) => {
  models.Character.findByPk(req.params.id)
    .then((characters) => {
      res.status(200).json({
        message: 'Got single characters!',
        characters,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occured getting all characters.',
        err,
      })
    })
})

// POST -> Create
// checkAuthMiddleware.checkauth <- middleware for auth if we want
router.post('/', checkAuthMiddleware.checkauth, (req, res, next) => {
  console.log('req.body in post for character:', req.body)
  models.Character.create({
    name: req.body.name,
    class: req.body.class,
    race: req.body.race,
    gender: req.body.gender,
    armorClass: req.body.armorClass,
    speed: req.body.speed,
    skill1: req.body.skill1,
    skill2: req.body.skill2,
    skill3: req.body.skill3,
    skill4: req.body.skill4,
    str: req.body.str,
    dex: req.body.dex,
    con: req.body.con,
    int: req.body.int,
    wis: req.body.wis,
    cha: req.body.cha,
    userId: req.body.userId,
  })
    .then((character) => {
      res.status(200).json({
        message: 'Successfully created character!',
        character,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error has occured creating this character.',
        err,
      })
    })
})

// PUT -> Update
router.put('/:id', (req, res, next) => {
  models.Character.findByPk(req.params.id).then((character) => {
    if (!character) {
      res.status(404).json({
        message: 'Could not find a character with that ID',
      })
    }

    character.update({
      name: req.body.name,
      class: req.body.class,
      race: req.body.race,
      gender: req.body.gender,
      armorClass: req.body.armorClass,
      speed: req.body.speed,
      skill1: req.body.skill1,
      skill2: req.body.skill2,
      skill3: req.body.skill3,
      skill4: req.body.skill4,
      str: req.body.str,
      dex: req.body.dex,
      con: req.body.con,
      int: req.body.int,
      wis: req.body.wis,
      cha: req.body.cha,
    })

    character.save()

    res.status(200).json({
      message: 'Successfully updated character!',
      character,
    })
  })
})

// DELETE -> Delete
router.delete('/:id', (req, res, next) => {
  models.Character.findByPk(req.params.id).then((character) => {
    if (!character) {
      res.status(404).json({
        message: 'Could not find a character with that ID',
      })
    }

    character.destroy()

    res.status(200).json({
      message: 'Successfully deleted character!',
    })
  })
})

module.exports = router
