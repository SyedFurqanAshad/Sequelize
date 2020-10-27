const express = require("express");
const router = express.Router();
const teams = require("../models/teams");

router.post("/addTeam", async (req, res) => {
  res.send(`${req.body.name} plays in ${req.body.league}`);

  const newTeam = await teams.create({
    name: req.body.name,
    league: req.body.league
  });
});
module.exports = router;
