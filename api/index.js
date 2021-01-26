const express = require("express")
const router = express.Router()

router.use("/characters", require("./character_controller"))
router.use("/classes", require("./class_controller"))

module.exports = router
