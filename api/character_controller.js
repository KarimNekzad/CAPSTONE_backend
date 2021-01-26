const express = require('express')
const router = express.Router()
const models = require('../database/models')

// GET -> Read all
router.get('/', (req, res, next) => {
  models.Character.findAll()
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

// GET by Pk -> Read by id
router.get('/:id', (req, res, next) => {
  models.Character.findByPk(req.params.id).then((character) => {
    if (!character) {
      res.status(404).json({
        message: 'Could not find a character with that ID',
      })
    }
    res.status(200).json({
      message: 'Successfully retrieved your character!',
      character,
    })
  })
})

// POST -> Create
router.post('/', (req, res, next) => {
  models.Character.create({
    class: req.body.class,
    race: req.body.race,
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
      class: req.body.class,
      race: req.body.race,
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
