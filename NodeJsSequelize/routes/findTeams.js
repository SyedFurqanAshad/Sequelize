const express = require("express");
const router = express.Router();
const teams = require("../models/teams");

router.get("/findTeam/:name", async (req, res) => {
  res.send(
    await teams.findAll({
      where: {
        name: req.params.name
      }
    })
  );
});
module.exports = router;
