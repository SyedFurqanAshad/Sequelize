const Sequelize = require("sequelize");
const db = require("../config/database");

const team = db.define(
  "Team",
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
    league: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },

  {
    timestamps: false
  }
);

const createTable = async () => {
  await team.sync();
};

createTable();
module.exports = team;
