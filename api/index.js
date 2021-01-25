const express = require("express")
const router = express.Router()

router.use("/characters", require("./character_controller"))

module.exports = router
