import Modal from "react-bootstrap/Modal";
import "./menuFiledDetailes.css";
import React, { useState } from "react";
import { ModalBody } from "react-bootstrap";
import ChangeNum from "../../SopingCart/ChangeNum/changeNum.js";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import logo from "../../../../asset/imgs/logo.png";

export default function MenuFiledDetailes({
  id,
  foodName,
  description,
  price,
  foodImg,
  changeItemNum,
  handleClose,
  show,
}) {
  const [timesToAdd, setTimesToAdd] = useState(1);

  const addItemNum = () => setTimesToAdd(timesToAdd + 1);
  const reduceItemNum = () => timesToAdd && setTimesToAdd(timesToAdd - 1);

  function addToCartAndClose() {
    changeItemNum(timesToAdd);
    handleClose();
    setTimesToAdd(1);
  }

  return (
    <Modal className="menuDetailesModal" show={show} onHide={handleClose}>
      <ModalHeader className="paymentHeader">
        <img src={logo} className="loginLogo" />
        <div className="loginHeader">{foodName}</div>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <br />
          <div className="col-9">{description}</div>
          <div className="col-3">
            <img className="foodImg2" src={foodImg} />
          </div>
          <ChangeNum
            id={id}
            times={timesToAdd}
            addItemNum={addItemNum}
            reduceItemNum={reduceItemNum}
          />
        </div>
      </ModalBody>
      <Modal.Footer className="footer">
        <div className="price">
          {price * timesToAdd + String.fromCharCode(0x20aa)}
        </div>
        <div className="secondary" onClick={addToCartAndClose}>
          הוסף לסל
        </div>
      </Modal.Footer>
    </Modal>
  );
}
