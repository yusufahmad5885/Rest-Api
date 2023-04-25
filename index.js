const express = require("express");

const app = express();
app.use(express.json()); //parse every json

let userList = [
  {
    id: 1,
    name: "Pedro",
    age: 19,
    married: false,
  },
  {
    id: 2,
    name: "Paulo",
    age: 20,
    married: false,
  },
  {
    id: 3,
    name: "Jennifer",
    age: 28,
    married: true,
  },
];

app.get("/users", (req, res) => {
  res.json(userList);
});

app.post("/users", (req, res) => {
  //get data from client, update data in list
  //return the new list
  const newUser = req.body;
  userList.push(newUser);
  res.json(userList);
});

app.put("/users", (req, res) => {
  const newName = req.body.newName;
  for (let i = 0; i < userList.length; i++) {
    userList[i].name = newName;
  }
  res.json(userList);
});

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
