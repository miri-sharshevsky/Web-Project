"use strict";
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
let worker;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    worker = db.collection("worker");
    console.log("connect");
  }
);

router.get("/:password", (req, res) => {
  worker
    .findOne({ workerPassword: req.params.password.slice(1) })
    .then((result) => {
      if (result === null) {
        res.json("in correct password");
      } else {
        res.json("ok");
      }
    });
});

module.exports = router;
