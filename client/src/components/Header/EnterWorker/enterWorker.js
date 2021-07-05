import React, { useState } from "react";
import { Modal, ModalFooter, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import logo from "../../../asset/imgs/logo.png";
import { isCorrectWorkerPassword } from "../../../Service/worker";
import "./enterWorker.css";

export default function EnterWorker({ show, handleClose, changeUser }) {
  const [isCorectPassword, setIsCorectPassword] = useState(true);
  const [enterPassword, setEnterPassword] = useState();

  const upDateFromFiled = (event) => setEnterPassword(event.target.value);

  async function enterWorker() {
    let response = await isCorrectWorkerPassword(enterPassword);
    if (response === "ok") {
      setIsCorectPassword(true);
      changeUser({ worker: "worker" });
      handleClose();
      setEnterPassword("");
    } else {
      setIsCorectPassword(false);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader className="paymentHeader">
        <img src={logo} className="loginLogo" />
        <div className="loginHeader">הכנס סיסמאת עובד</div>
      </ModalHeader>
      <ModalBody className="enterWorker-detailes">
        <input
          className="enterWorker-input"
          type="password"
          name="password"
          id="password"
          className="enterWorker-from"
          placeholder="סיסמא"
          onChange={upDateFromFiled}
          value={enterPassword}
        />
        {!isCorectPassword && <small className="errors">סיסמא לא נכונה</small>}
        <br />
      </ModalBody>
      <ModalFooter>
        <div className="secondary" onClick={enterWorker}>
          כניסה
        </div>
      </ModalFooter>
    </Modal>
  );
}
