require("dotenv").config();
const express = require("express");

const app = express();
const mysql = require("mysql");

const pswd = process.env.pswd;

const db = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1", //This is your localhost IP
  user: "root", // "newuser" created in Step 1(e)
  password: pswd, // password for the new user --->>> Hide!
  database: "userdb", // Database name
  port: "3306", // port name, "3306" by default
});

app.use(express.json()); //parse every json

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/users", (req, res) => {
  //const name = req.body.name;
  //const age = req.body.age;
  db.query(
    "INSERT INTO users (name, age) VALUES ('steph', '19');",
    //[name, age],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.put("/users", (req, res) => {
  db.query(
    "UPDATE users SET users.name = 'Stephen Curry' WHERE users.name = 'steph'",
    //[names],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.delete("/users", (req, res) => {
  //const names = req.body.name;
  db.query(
    "DELETE FROM users WHERE users.name ='steph'",
    //[names],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
  /*
  let sql = `DELETE FROM users WHERE name=` + names;

  db.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
  */
  /*
  db.query(`DELETE FROM users WHERE name=` + names, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
  */
});

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
