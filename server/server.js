"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

var cors = require("cors");

app.use(cors());

app.listen(5000, () => console.log(`Listening on port 5000`));

app.use("/users", require("./users"));
app.use("/menu", require("./menu"));
app.use("/questions", require("./questions"));
app.use("/responses", require("./responses"));
app.use("/branches", require("./branches"));
app.use("/orders", require("./orders"));
app.use("/worker", require("./worker"));
