const Sequelize = require("sequelize");
const db = require("../config/database");

const player = db.define(
  "Player",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    teamId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
const createTable = async () => {
  await player.sync();
};

createTable();
module.exports = player;
