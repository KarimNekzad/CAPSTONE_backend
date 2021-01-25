const express = require("express")
const router = express.Router()
const models = require("../database/models")

// GET -> Read all
router.get("/", (req, res, next) => {
  models.Character.findAll()
    .then((characters) => {
      res.status(200).json({
        message: "Got all characters!",
        characters,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occured getting all characters.",
        err,
      })
    })
})

// POST -> Create
router.post("/", (req, res, next) => {
  models.Character.create({
    class: req.body.class,
    race: req.body.race,
  })
    .then((character) => {
      res.status(200).json({
        message: "Successfully created character!",
        character,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error has occured creating this character.",
        err,
      })
    })
})

module.exports = router
