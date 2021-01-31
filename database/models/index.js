const db = require('../dbinit')
const Character = require('./Character')
const User = require('./User')

// association
User.hasMany(Character)
Character.belongsTo(User)

// allows for changes in database
// FORCE TRUE DELETES ALL THE DATA IN THE DATABASE, ONLY USE IF MODIFYING MODELS
// db.sequelize.sync({ force: true })
db.sequelize.sync({ alter: true })

module.exports = {
  Character,
  User,
}
