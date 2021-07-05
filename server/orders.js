"use strict";
const { email } = require("./mailServer");
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://miri:Msh0583272883@cluster0.l5qvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
let orders;
let users;

MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("TakeEat");
    orders = db.collection("orders");
    users = db.collection("users");
    console.log("connect");
  }
);

router.get("/", (req, res) => {
  orders
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

router.post("/", async (req, res) => {
  if (
    req.body.phoneNumber === undefined ||
    req.body.address === undefined ||
    req.body.date === undefined ||
    req.body.costumerId === undefined ||
    req.body.id === undefined ||
    req.body.costumerName === undefined ||
    req.body.time === undefined ||
    req.body.price === undefined ||
    req.body.order === undefined ||
    req.body.status === undefined ||
    req.body.payType === undefined
  ) {
    res.json("missing fileds in the order");
  } else {
    {
      let errors = await upDateErrorsPyMent(req.body);
      if (errors.address === undefined && errors.phoneNumber === undefined) {
        let userEmail, userName;
        orders.insertOne(req.body).then(() => {
          users.findOne({ id: req.body.costumerId }).then(async (result) => {
            userEmail = result.email;

            await email(
              userEmail,
              req.body.costumerName,
              req.body.payType === "מזומן"
                ? "אישור ההזמנה " +
                    " הזמנתך נקלטה בהצלחה" +
                    " סהכ מחיר לתשלום : " +
                    req.body.price +
                    " ₪" +
                    "יש לשלם במזומן בעת קבלת המשלוח"
                : " אישור הזמנה , הזמנתך נקלטה בהצלחה במערכת סהכ שולם: " +
                    req.body.price +
                    "₪ "
            );
            res.json("ok");
          });
        });
      } else {
        res.json(errors);
      }
    }
  }
});

router.put("/:orderId", async (req, res) => {
  orders.findOne({ id: Number(req.params.orderId.slice(1)) }).then((result) => {
    if (result === null) {
      res.json("not founed");
    } else {
      orders.updateOne(
        {
          id: Number(req.params.orderId.slice(1)),
        },
        { $set: { status: req.body.status } }
      );
      res.json("ok");
    }
  });
});

//=============================================
//==============Order Validations==============
//=============================================
const errorsForLogin = {
  isRquire: "שדה זה הוא חובה",
  address: "כתובת חוקית מכילה רחוב מספר בית ועיר",
  phoneNumber: "מספר טלפון לא תקין",
  payType: "לא נבחר אמצעי תשלום",
  order: "הזמנתך ריקה"
};

function upDateErrorsPyMent(values) {
  let check = null;
  const errors = {};
  check = isPhoneNumberValid(values.phoneNumber);
  if (check !== null) {
    errors.phoneNumber = check;
  }
  check = isAddressValid(values.address);
  if (check !== null) {
    errors.address = check;
  }

  if (values.orderDate === "") {
    errors.orderDate = errorsForLogin.isRquire;
  }
  if (values.orderTime === "") {
    errors.orderTime = errorsForLogin.isRquire;
  }
  if(values.payType === ""){
    errors.payType = errorsForLogin.payType
  }
  if (values.order.length === 0){
    errors.order = errorsForLogin.order
  }
  return errors;
}

function isRequire(fromFiled) {
  return fromFiled === "";
}

//===================================
//=====phoneNumber Validation====
//===================================
const isPhoneNumberValid = (phoneNum) => {
  if (isRequire(phoneNum)) {
    return errorsForLogin.isRquire;
  }
  let phoneRegex = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
  if (!phoneRegex.test(phoneNum)) {
    return errorsForLogin.phoneNumber;
  }
  return null;
};

//===================================
//=========address Validation========
//===================================

const isAddressValid = (address) => {
  if (isRequire(address)) {
    return errorsForLogin.isRquire;
  }
  let addressReges = /^["א-ת0-9\s,'-]*$/;
  if (!(addressReges.test(address) && address.split(" ").length > 2)) {
    return errorsForLogin.address;
  }
  return null;
};

module.exports = router;
