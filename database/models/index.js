const db = require("../dbinit")
const Character = require("./Character")

db.sequelize.sync({ alter: true })

module.exports = {
  Character,
}
