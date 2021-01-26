const express = require('express')
const app = express()
const cors = require('cors')

// ensure express uses proper middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors())

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'On homepage capstone team kilo.',
  })
})

app.use('/api', require('./api'))

app.listen(8080, () => {
  console.log('Listening on port 8080. CAPSTONE.')
})
