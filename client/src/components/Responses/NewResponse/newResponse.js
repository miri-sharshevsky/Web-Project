import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import "./newResponse.css";
import logo from "../../../asset/imgs/logo.png";
import StarRatings from "react-star-ratings";

export default function NewResponse({ show, handleClose, addNewResponse }) {
  const [response, setResponse] = useState({ response: "", rating: 3 });

  const upDateResponse = (event) => {
    setResponse({ ...response, response: event.target.value });
  };

  function addNewResponseAndClose(response) {
    addNewResponse(response);
    handleClose();
  }
  return (
    <>
      {window.localStorage.user !== "null" &&
        JSON.parse(localStorage.user).worker === undefined && (
          <Modal show={show} onHide={handleClose}>
            <ModalHeader className="paymentHeader">
              <img src={logo} className="loginLogo" />
              <div className="loginHeader">דרג אותנו</div>
            </ModalHeader>
            <ModalBody>
              <div className="stars">
                <StarRatings
                  changeRating={(rate) => {
                    setResponse({ ...response, rating: rate });
                  }}
                  rating={response.rating}
                  starEmptyColor="black"
                  starRatedColor="#f3cb16"
                  starEmptyColor="gray"
                  starHoverColor="#f3cb16"
                  starDimension="24px"
                />
              </div>
              <p className="newResponse-text">התגובה שלך:</p>
              <textarea onChange={upDateResponse}></textarea>
            </ModalBody>
            <ModalFooter>
              <div
                className="secondary"
                onClick={() => addNewResponseAndClose(response)}
              >
                אישור
              </div>
            </ModalFooter>
          </Modal>
        )}
      {(window.localStorage.user === "null" ||
        JSON.parse(localStorage.user).worker !== undefined) && (
        <Modal show={show} onHide={handleClose}>
          <ModalHeader className="paymentHeader">
            <img src={logo} className="loginLogo" />
            <div className="loginHeader">הי</div>
          </ModalHeader>
          <ModalBody>
            <div className="text"> עדיין לא נכנסת למערכת כלקוח</div>
            <div className="text">אינך יכול להגיב</div>
            <div className="text">מחכים לך שתכנס</div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
