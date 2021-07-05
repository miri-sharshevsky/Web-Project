"use strict";
const express = require("express");
const { email } = require("./mailServer");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db;
let users;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    users = db.collection("users");
    console.log("connect");
  }
);

router.post("/:userId", async (req, res) => {
  await users.findOne({ id: req.params.userId.slice(1) }).then((result) => {
    if (result === null) {
      res.json("not Founed");
    } else if (req.body.detailes === "getForLocalStorage") {
      let user = {
        id: result.id,
        name: result.name,
        email: result.email,
        shopingCart: result.shopingCart,
        globalPrice: result.globalPrice,
      };
      res.json(user);
    } else {
      if (
        result.email.toLowerCase() === req.body.email.toLowerCase() &&
        result.password === req.body.password
      ) {
        let user = {
          id: result.id,
          name: result.name,
          email: result.email,
          shopingCart: result.shopingCart,
          globalPrice: result.globalPrice,
        };
        res.json(user);
      } else {
        res.json("invalid email or password");
      }
    }
  });
});

router.post("/", async (req, res) => {
  if (
    req.body.id === undefined ||
    req.body.name === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.confirmPassword === undefined
  ) {
    res.json("missing field in the body");
  } else {
    let errors = await upDateErrors(req.body);
    if (
      errors.id === undefined &&
      errors.name === undefined &&
      errors.email === undefined &&
      errors.password === undefined &&
      errors.confirmPassword === undefined
    ) {
      users.findOne({ id: req.body.id }).then((result) => {
        if (result !== null) {
          res.json("this user is still in");
        } else {
          let user = { ...req.body, globalPrice: 0, shopingCart: [] };

          users.insertOne(user).then(async() => {
            await email(
              req.body.email,
              req.body.name,
              "אני שמחים על הצטרפותך לקהילת TakeEat הנך מוזמן להכנס אלינו ולבצע הזמנות בקליק אחד"
            );
            res.json("ok");
          });
        }
      });
    } else {
      res.json(errors);
    }
  }
});

router.put("/:userId", async (req, res) => {
  users.findOne({ id: req.params.userId.slice(1) }).then((result) => {
    if (result === null) {
      res.json("not Founed");
    } else {
      if (req.body.shopingCart == undefined) {
        changeUserPassword(req, res, result);
      } else {
        users.updateOne(
          {
            id: req.params.userId.slice(1),
          },
          {
            $set: {
              shopingCart: req.body.shopingCart,
              globalPrice: req.body.globalPrice,
            },
          }
        );
        res.json("ok");
      }
    }
  });
});

async function changeUserPassword(req, res, result) {
  const newPass =
    Math.random().toString(36).slice(-7) +
    Math.random().toString(36).toUpperCase().slice(-1);
  users.update(
    { id: req.params.userId.slice(1) },
    { $set: { password: newPass } }
  );
  await email(result.email, result.name, "סיסמתך החדשה הינה: " + newPass);
  res.json("ok");
}
//=================================================
//===================Validations===================
//=================================================

const errorsForLogin = {
  isRquire: "שדה זה הוא חובה",
  id: "מספר זהות לא תקינה",
  name: "שם לא חוקי",
  email: "כתובת אימייל לא חוקית",
  password: " סיסמא חוקית צריכה להכיל בין 5-20 תוים בינהם אות ומספר",
  confirmPassword: "אימות  סיסמא נכשל",
};

const upDateErrors = async (values) => {
  let check = null;
  let errors = {};
  check = checkId(values.id);
  if (check != null) {
    errors.id = check;
  }
  check = checkName(values.name);
  if (check != null) {
    errors.name = check;
  }
  check = checkEmail(values.email);
  if (check != null) {
    errors.email = check;
  }
  check = checkPassword(values.password);
  if (check != null) {
    errors.password = check;
  }
  check = checkConfirmPassword(values.confirmPassword, values.password);
  if (check != null) {
    errors.confirmPassword = check;
  }
  if (isRequire(values.orderDate)) {
    errors.orderDate = errorsForLogin.isRquire;
  }
  if (isRequire(values.orderTime)) {
    errors.orderTime = errorsForLogin.isRquire;
  }
  //let errorsToSend = errors;
  return errors;
};

function isRequire(fromFiled) {
  return fromFiled === "";
}

//======================
//====ID Validation:====
//======================

const checkId = (idNumber) => {
  if (isRequire(idNumber)) {
    return errorsForLogin.isRquire;
  }
  if (!isIDnumberValid(idNumber)) {
    return errorsForLogin.id;
  }
  return null;
};

const isIDnumberValid = (id) => {
  // if (!id.match(/^\d{9}$/)) {
  //   return false;
  // }
  let counter = 0;
  let increaseNum;
  for (let i = 0; i < id.length; i++) {
    increaseNum = Number(id[i]) * ((i % 2) + 1);
    counter += increaseNum > 9 ? increaseNum - 9 : increaseNum;
  }
  return counter % 10 === 0;
};
//============================
//====firstName Validation====
//============================

function validName(name) {
  return /^[a-zA-Zא-ת' ']+$/.test(name) && name.length <= 20;
}

function checkName(name) {
  if (isRequire(name)) {
    return errorsForLogin.isRquire;
  } else if (!validName(name)) {
    return errorsForLogin.name;
  } else {
    return null;
  }
}

//========================
//====email Validation====
//========================

function validEmail(email) {
  const regularEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularEmail.test(String(email).toLowerCase());
}

function checkEmail(email) {
  if (isRequire(email)) {
    return errorsForLogin.isRquire;
  } else if (!validEmail(email)) {
    return errorsForLogin.email;
  } else {
    return null;
  }
}

//===========================
//====password Validation====
//===========================

function validPassword(password) {
  return password.match(/^(?=.*\d)(?=.*[a-z A-Z]).{5,20}$/);
}
function checkPassword(password) {
  if (isRequire(password)) {
    return errorsForLogin.isRquire;
  } else if (!validPassword(password)) {
    return errorsForLogin.password;
  } else {
    return null;
  }
}

//===================================
//=====confirmPassword Validation====
//===================================

function checkConfirmPassword(confirmPassword, password) {
  if (isRequire(confirmPassword)) {
    return errorsForLogin.isRquire;
  } else if (confirmPassword !== password) {
    return errorsForLogin.confirmPassword;
  } else {
    return null;
  }
}

module.exports = router;
