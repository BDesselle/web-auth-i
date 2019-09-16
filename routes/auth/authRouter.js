const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./authModel");
const app = express.Router();

//! CREATE
//* Register a new user
app.post("/register", (req, res) => {
  try {
    let { username, password } = req.body;
    let hash = bcrypt.hashSync(password, 10);
    db.add({ username, password: hash }).then(response => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//* Login with user credentials
app.post("/login", (req, res) => {
  try {
    let { username, password } = req.body;
    db.findBy({ username })
      .first()
      .then(response => {
        bcrypt.compareSync(password, response.password)
          ? res.status(200).json({ message: `Welcome ${response.username}!` })
          : res.status(401).json({ message: "Invalid Credentials" });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});
//! READ
//* Get all users
app.get("/users", (req, res) => {
  try {
    db.find().then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//* Get hash
app.get("/hash", (req, res) => {
  try {
    const name = req.query.name;
    const hash = bcrypt.hashSync(name, 8);
    res.send(`The hash for ${name} is ${hash}`);
  } catch (err) {
    res.status(500).json(err);
  }
});
//! UPDATE
//! DELETE

//! MIDDLEWARE
function withAuth(req, res, next) {
  try {
    let { username, password } = req.headers;
    db.findBy({ username })
      .first()
      .then(response => {
        response && bcrypt.compareSync(password, response.password)
          ? next()
          : res.status(401).json({ message: "You cannot pass!" });
      });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = app;
