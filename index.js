
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
const newUser = {
  "_id": 6,
  "name": "Fred Flintstone",
  "occupation": "Quarry Worker",
  "avatar": "Rock"
};

const { users } = require('./state')
let counter = users.length;

app.use(bodyParser());

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  return res.json(users);
});
app.get("/users/1", (req, res) => {
  return res.json(users[0]);
});
app.post("/users", (req, res) => {
  users.push(newUser);
  return res.json(users[users.length -1]);
});
app.put("/users/1", (req, res) => {
  users[0].name = "Elvira";
  return res.json(users[0]);
});
app.delete("/users/1", (req, res) => {
  users.shift(users[0]);
  return res.json(users);
});
app.post("/users", (req, res => {
  console.log(req.body);
}));



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))