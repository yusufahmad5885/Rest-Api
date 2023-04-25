const express = require("express");

const app = express();
app.use(express.json()); //parse every json

const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  //password: "",
  database: "userdb",
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
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

app.delete("/users/:id", (req, res) => {
  //get id
  //delete the user with id
  //return list
  const id = req.params.id;
  let foundId = false;
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id == id) {
      userList.splice(i, 1);
      foundId = true;
    }
  }

  if (!foundId) {
    res.status(404).json({ error: "user id not found" });
  } else {
    res.json(userList);
  }
});

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
