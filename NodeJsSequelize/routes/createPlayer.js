const express = require("express");
const router = express.Router();
const player = require("../models/player");

router.post("/addPlayer", async (req, res) => {
  res.send(
    `${req.body.name} plays in ${req.body.teamId} with the rationg of ${req.body.rating}`
  );

  await player.create({
    name: req.body.name,
    teamId: req.body.teamId,
    rating: req.body.rating
  });
});
module.exports = router;
