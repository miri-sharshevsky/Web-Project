var nodemailer = require("nodemailer");

exports.email = function (email, userName, massage) {
  var transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
      user: "takeeat100@gmail.com",
      pass: "Msh0583272883",
    },
  });

  var mailOptions = {
    from: "sprojectmiri@gmail.com",
    to: email,
    subject: "שלום " + userName,
    text: massage,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("sent email!");
    }
  });
};
