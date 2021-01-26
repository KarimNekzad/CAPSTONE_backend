const Sequelize = require("sequelize")
require("dotenv").config()

// database name, username, pass
const sequelize = new Sequelize("capstone", "postgres", "jkPivt", {
  host: process.env.localhost,
  dialect: "postgres",
})

const testDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully")
  } catch (error) {
    console.error("Unable to connect to database", error)
  }
}
console.log("process.env.host:", process.env.host)

testDatabase()

module.exports = { sequelize }
