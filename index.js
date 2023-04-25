const express = require("express");

const app = express();

let userList = [
  {
    name: "Pedro",
    age: 19,
    married: false,
  },
  {
    name: "Paulo",
    age: 20,
    married: false,
  },
  {
    name: "Jennifer",
    age: 28,
    married: true,
  },
];

app.get("/users", (req, res) => {
  res.json(userList);
});

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
