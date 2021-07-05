"use strict";
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
let branches;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    branches = db.collection("branches");
    console.log("connect");
  }
);

router.get("/", (req, res) => {
  branches
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

router.post("/", async (req, res) => {
  let closeBranches = [];
  const nodeGeocoder = require("node-geocoder");
  if (req.body.address === undefined) {
    res.json("missing user adrress");
  } else {
    let options = {
      provider: "google",
      apiKey: "AIzaSyC52R7VHe5-Etup41G8odeCv0Qr-3wyqcA",
    };
    let userLatitude;
    let userLongitude;
    let geoCoder = nodeGeocoder(options);
    geoCoder.geocode(req.body.address).then((res) => {
      userLatitude = res[0].latitude;
      userLongitude = res[0].longitude;
    });
    await branches
      .find()
      .toArray()
      .then(async (result) => {
        for (let i = 0; i < result.length; i++) {
          await geoCoder.geocode(result[i].street).then(async (res2) => {
            let branchLatitude = res2[0].latitude;
            let branchLongitude = res2[0].longitude;
            if (
              Math.abs(branchLatitude - userLatitude) < 0.02 &&
              Math.abs(branchLongitude - userLongitude) < 0.02
            ) {
              await closeBranches.push(result[i]);
            }
          });
        }
      });

    res.json(closeBranches);
  }
});

module.exports = router;
