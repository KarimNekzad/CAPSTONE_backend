const Sequelize = require("sequelize")
const db = require("../dbinit")

const Character = db.sequelize.define("Character", {
  class: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  race: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Character
