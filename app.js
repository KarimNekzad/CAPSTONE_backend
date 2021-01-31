const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

// ensure express uses proper middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors())

app.get('/', (req, res, next) => {
  res.status(200).json({
    message:
      'On homepage capstone team kilo. Team: Yifeng Zheng, Karim Nekzad, YeukSing Chan, Alexander Petrovski. D&D Application Backend.',
  })
})

app.use('/api', require('./api'))
app.use('/user', require('./user'))

app.listen(port, () => {
  console.log('Listening on port 8080. CAPSTONE.')
})
