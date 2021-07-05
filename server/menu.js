"use strict";
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
let menu;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    menu = db.collection("menu");
    console.log("connect");
  }
);

router.get("/", (req, res) => {
  menu
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

module.exports = router;
