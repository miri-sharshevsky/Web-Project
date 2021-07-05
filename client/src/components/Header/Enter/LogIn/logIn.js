import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import logo from "../../../../asset/imgs/logo.png";
import "./logIn.css";
import { upDateErrors } from "../../../../shered/validation";
import { addNewUser } from "../../../../Service/users.js";
import { init } from "emailjs-com";
init("user_cCb0Le8ziIqKdZJH8cK8P");

export default function LogIn({ handlClose, show }) {
  const [newUserDetailes, setFormFiledValues] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showOk, setShowOk] = useState(false);
  const [inData, setInData] = useState(false);

  function openOk() {
    setShowOk(true);
  }

  const closeOk = () => setShowOk(false);
  const openInData = () => setInData(true);
  const closeInData = () => setInData(false);

  function upDateFromFiled(event) {
    setFormFiledValues({
      ...newUserDetailes,
      [event.target.name]: event.target.value,
    });
  }

  async function login(event) {
    event.preventDefault();
    let errors = upDateErrors(newUserDetailes);
    setErrors(errors);
    if (
      errors.name == undefined &&
      errors.email == undefined &&
      errors.id == undefined &&
      errors.password == undefined &&
      errors.confirmPassword == undefined
    ) {
      const newErrors = await addNewUser(newUserDetailes);
      if (newErrors === "this user is still in") {
        handlClose();
        openInData();
      } else {
        handlClose();
        openOk();
      }
    }
  }

  return (
    <>
      <Modal show={show} onHide={handlClose}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">הרשמה</div>
        </ModalHeader>
        <ModalBody className="detailes">
          <input
            type="text"
            name="id"
            id="id"
            className="login-form"
            placeholder="מספר זהות"
            onChange={upDateFromFiled}
            value={newUserDetailes.id}
          />
          {errors.id && <small className="errors">{errors.id}</small>}
          <br />
          <br />
          <input
            type="text"
            name="name"
            id="name"
            className="login-form"
            placeholder="שם"
            onChange={upDateFromFiled}
            value={newUserDetailes.name}
          />
          {errors.name && <small className="errors">{errors.name}</small>}
          <br />
          <br />
          <input
            type="email"
            name="email"
            id="email"
            className="login-form"
            placeholder="כתובת אימייל"
            onChange={upDateFromFiled}
            value={newUserDetailes.email}
          />
          {errors.email && <small className="errors">{errors.email}</small>}
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="login-form"
            placeholder="סיסמא"
            onChange={upDateFromFiled}
            value={newUserDetailes.password}
          />
          {errors.password && (
            <small className="errors">{errors.password}</small>
          )}
          <br />
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="login-form"
            placeholder="אימות סיסמא"
            onChange={upDateFromFiled}
            value={newUserDetailes.confirmPassword}
          />
          {errors.confirmPassword && (
            <small className="errors">{errors.confirmPassword}</small>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="secondary" onClick={login}>
            רישום
          </div>
        </ModalFooter>
      </Modal>
      <Modal show={showOk} onHide={closeOk}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">{newUserDetailes.name} שלום</div>
        </ModalHeader>
        <ModalBody>
          <div className="text">
            הפרטים שלך נרשמו במערכת
            <br />
            כתובת אימייל: {newUserDetailes.email}
            <br />
            נשלח אליך כעת מייל אוטמטי המאשר את הצטרפותך למערכת
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="text">נשמח לשרת אותך תמיד - צוות takeEat</div>
        </ModalFooter>
      </Modal>
      <Modal show={inData} onHide={closeInData}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
        </ModalHeader>
        <ModalBody>
          <div className="text">
            המספר כבר קיים במערכת
            <br />
            מוזמן להכנס
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
