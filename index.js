
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
// app.get("/users", (req, res) => {
//   return res.json(users);
// });
// app.get("/users/1", (req, res) => {
//   return res.json(users[0]);
// });
app.post("/users", (req, res) => {
  users.push(newUser);
  return res.json(users[users.length -1]);
});
app.put("/users/1", (req, res) => {
  users[0].name = "Elvira";
  return res.json(users[0]);
});
app.delete("/users/1", (req, res) => {
  return res.json(users.slice(1));
  // return res.json(newUsers);
});
app.post("/users", (req, res) => {
  console.log(req.body);
  users.push({
      _id: (counter +=1),
      ...req.body
    });
  return res.json(users);
});
app.get("/users/:userId", (req, res) => {
  const id = req.params.userId;
  const user = users.filter(u => u._id === Number(id));
  return res.json(user);
});
app.put("/users/:userId", (req, res) => {
  const id = req.params.userId;
  const user = users.find(u => u._id === Number(id));
  user.occupation = "slacker";
  return res.json(user);
});
app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId;
  for (let i = 0; i < users.length; i++){
    if (users[i]._id === Number(id)){
      let spliced = users.splice(i, 1);
      spliced[0].isActive = false;
    }
  }
  res.send("deleted");
});



/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))