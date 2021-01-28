const Sequelize = require('sequelize')
require('dotenv').config()

// database name, username, pass
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // host: process.env.host,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
    },
  },
})

const testDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully')
  } catch (error) {
    console.error('Unable to connect to database', error)
  }
}
console.log('process.env.host:', process.env.host)

testDatabase()

module.exports = { sequelize }
