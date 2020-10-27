const express = require("express");
const router = express.Router();
const players = require("../models/player");

router.get("/players", async (req, res) => {
  res.send(await players.findAll());
});
module.exports = router;
