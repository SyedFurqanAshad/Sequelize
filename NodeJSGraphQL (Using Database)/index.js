const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database Connected "))
  .catch(err => console.log("Error ", err));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(3000, () => console.log("Listening on Port 3000"));
