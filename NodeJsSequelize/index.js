const express = require("express");
const app = express();
const db = require("./config/database");
const getTeams = require("./routes/getTeams");
const createTeam = require("./routes/createTeam");
const findTeam = require("./routes/findTeams");
const getPlayer = require("./routes/getPlayer");
const createPlayer = require("./routes/createPlayer");
const teamswithPlayers = require("./routes/teamsWithPlayers");

db.authenticate()
  .then(() => console.log("Database Connected "))
  .catch(err => console.log("Error ", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/teams", getTeams);
app.use("/", createTeam);
app.use("/", findTeam);
app.use("/", createPlayer);
app.use("/", getPlayer);
app.use("/", teamswithPlayers);

app.listen(3000, () => console.log("Listening on Port 3000"));
