const express = require("express");
const router = express.Router();
const teams = require("../models/teams");

router.get("/", async (req, res) => {
  res.send(await teams.findAll());
});
module.exports = router;
