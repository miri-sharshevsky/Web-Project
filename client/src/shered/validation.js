const errorsForLogin = {
  isRquire: "שדה זה הוא חובה",
  id: "מספר זהות לא תקינה",
  name: "שם לא חוקי",
  email: "כתובת אימייל לא חוקית",
  password: " סיסמא חוקית צריכה להכיל בין 5-20 תוים בינהם אות ומספר",
  confirmPassword: "אימות  סיסמא נכשל",
  address: "כתובת חוקית מכילה רחוב מספר בית ועיר",
  phoneNumber: "מספר טלפון לא תקין",
  order: "הזמנתך ריקה",
  payType: "לא נבחר אמצעי תשלום"
};

function upDateErrors(values) {
  let check = null;
  const errors = [];
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
  return errors;
}
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
  if (values.order.length === 0){
    errors.order = errorsForLogin.order
  }
  if(values.payType === ""){
    errors.payType = errorsForLogin.payType  
  }
  return errors;
}

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
  if (!id.match(/^\d{9}$/)) {
    return false;
  }
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

export { upDateErrors, upDateErrorsPyMent };
