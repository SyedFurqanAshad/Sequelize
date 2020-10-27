const express = require("express");
const router = express.Router();
const team = require("../models/teams");
const players = require("../models/player");

router.get("/teamsWithPlayers", async (req, res) => {
  team.hasMany(players, { foreignKey: "teamId" });

  res.send(
    await team.findAll({ include: [{ model: players, as: "Players" }] })
  );
});
module.exports = router;
