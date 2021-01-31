const Sequelize = require('sequelize')
const db = require('../dbinit')

const Character = db.sequelize.define('character', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  class: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  race: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  armorClass: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  skill1: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  skill2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  skill3: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  skill4: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  str: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  con: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  int: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  wis: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cha: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  personalityTraits: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  flaws: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  ideals: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  bonds: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  attacksAndSpellcasting: {
    type: Sequelize.TEXT,
  },
  featuresAndTraits: {
    type: Sequelize.TEXT,
  },
  equipment: {
    type: Sequelize.TEXT,
  },
  // passiveWisdom: {
  //   tpye: Sequelize.INTEGER,
  // },
  profAndLang: {
    type: Sequelize.TEXT,
  },
})

module.exports = Character
