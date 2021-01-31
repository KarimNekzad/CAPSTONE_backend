const db = require('../dbinit')
const Character = require('./Character')
const User = require('./User')

// association
User.hasMany(Character)
Character.belongsTo(User)

// allows for changes in database
// FORCE TRUE DELETES ALL THE DATA IN THE DATABASE, ONLY USE IF MODIFYING MODELS
// db.sequelize.sync({ force: true })

//****************************************
// THIS BRANCH IS FOR LOCAL TESTING ONLY! DO NOT MERGE THIS WITH MASTER
// JUST CHECKOUT BACK TO MASTER AND ADD CHANGES THERE IF NEEDED
//*****************************************

db.sequelize.sync({ alter: true })

module.exports = {
  Character,
  User,
}
