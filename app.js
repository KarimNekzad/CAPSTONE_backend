const express = require("express")
const app = express()

// ensure express uses proper middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "On homepage capstone team kilo.",
  })
})

app.use("/api", require("./api"))

app.listen(8080, () => {
  console.log("Listening on port 8080. CAPSTONE.")
})
