const db = require('../dbinit')
const Character = require('./Character')
const User = require('./User')

// association
User.hasMany(Character)
Character.belongsTo(User)

// allows for changes in database
db.sequelize.sync({ alter : true })

module.exports = {
  Character,
  User,
}
