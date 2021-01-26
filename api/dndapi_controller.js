const express = require('express')
const router = express.Router()
const models = require('../database/models')
const axios = require('axios')

// GET -> Get from the api | e.g.; classes/monk || proficiencies/woodcarvers-tools
// localhost:8080/api/dndapi/:urlargs
// NOTE: the '(*)' allows for more than one param with slash; without it /classes works but /classes/monk wouldn't, but the '*' makes it so that /classes/monk works
router.get('/:urlargs(*)', async (req, res, next) => {
  console.log('req.params.apicall:', req.params.urlargs)
  axios
    .get(`https://www.dnd5eapi.co/api/${req.params.urlargs}`)
    .then((response) => {
      res.status(200).json({
        message: 'Successfully retrieved data!',
        response: response.data,
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: 'There was an error retrieveing the data!',
        err,
      })
    })
})

module.exports = router
