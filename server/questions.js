"use strict";
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
let questions;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    questions = db.collection("questions");
    console.log("connect");
  }
);

router.get("/", (req, res) => {
  questions
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

router.post("/", (req, res) => {
  questions.insertOne(req.body).then(() => {
    res.send("ok");
  });
});

module.exports = router;
