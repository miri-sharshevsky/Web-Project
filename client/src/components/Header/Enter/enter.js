import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import logo from "../../../asset/imgs/logo.png";
import LogIn from "./LogIn/logIn";
import "./enter.css";
import EnterWorker from "../EnterWorker/enterWorker";
import { changeUserPassword, getUsersbyId } from "../../../Service/users";
import { init } from "emailjs-com";
init("user_cCb0Le8ziIqKdZJH8cK8P");

export default function Enter({ handleClose, handleOpen, show, changeUser }) {
  const [userDetailes, setUserDetailes] = useState({
    id: "",
    email: "",
    password: "",
  });

  const [showNotFound, setShowNotFound] = useState(false);
  const [showEnterWorker, setShowEnterWrker] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [users, setUsers] = useState([]);
  const [changes, setchanges] = useState(false);
  const [showSendEmail, setshowSendEmail] = useState(false);
  const openEnterWorker = () => setShowEnterWrker(true);
  const closeEnterWorker = () => setShowEnterWrker(false);
  const openNotFound = () => setShowNotFound(true);
  const closeNotFound = () => setShowNotFound(false);
  let history = useHistory();

  function openLogIn() {
    closeNotFound();
    setShowLogIn(true);
  }

  function enterWorker() {
    handleClose();
    openEnterWorker();
    history.push("/");
  }
  const closeLogIn = () => setShowLogIn(false);

  function openLogInandClose() {
    openLogIn();
    handleClose();
  }
  function upDateFromFiled(event) {
    setUserDetailes({
      ...userDetailes,
      [event.target.name]: event.target.value,
    });
  }

  function handleOpenTwice() {
    closeNotFound();
    handleOpen();
  }

  async function getNewPassword() {
    let res = await changeUserPassword(userDetailes.id);
    if (res === "not Founed") {
      handleClose();
      setShowNotFound(true);
    } else if (res === "ok") {
      setshowSendEmail(true);
      setchanges(!changes);
    }
  }

  async function enter() {
    let user = await getUsersbyId(userDetailes.id, {
      email: userDetailes.email,
      password: userDetailes.password,
    });
    if (user === "not Founed") {
      handleClose();
      setUserDetailes({
        id: "",
        password: "",
      });
      openNotFound();
    } else if (user === "invalid email or password") {
      setCorrectPassword(false);
    } else {
      setCorrectPassword(true);
      changeUser(user);
      handleClose();
      setUserDetailes({
        id: "",
        password: "",
        email: "",
      });
      history.push("/");
      setshowSendEmail(false);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">??????????</div>
        </ModalHeader>
        <ModalBody className="detailes">
          <div className="enter-sighinIn" onClick={openLogInandClose}>
            ?????????? ?????? ???? ??????????? ???????? ??????????
          </div>
          <div className="secondary" onClick={enterWorker}>
            ?????????? ??????????
          </div>
          <hr />
          <input
            type="text"
            name="id"
            id="id"
            className="enter-from"
            placeholder="???????? ????????"
            onChange={upDateFromFiled}
            value={userDetailes.id}
          />
          <br />
          <br />
          <input
            type="text"
            name="email"
            id="email"
            className="enter-from"
            placeholder="?????????? ???????? ??????????"
            onChange={upDateFromFiled}
            value={userDetailes.email}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="enter-from"
            placeholder="??????????"
            onChange={upDateFromFiled}
            value={userDetailes.password}
          />
          {!correctPassword && (
            <small className="errors">
              {" "}
              ?????????? ???? ???????????? ???????? ????????????
              <br />
            </small>
          )}
          <small onClick={getNewPassword} className="enter-forgetPassword">
            ?????????? ??????????
          </small>

          {showSendEmail && (
            <small>???????? ???????? ???????? ???? ?????????? ???????? ???????? ???????? ??????</small>
          )}
          <br />
        </ModalBody>
        <ModalFooter>
          <div className="secondary" onClick={enter}>
            ??????????
          </div>
        </ModalFooter>
      </Modal>
      <Modal show={showNotFound} onHide={closeNotFound}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">????????...</div>
        </ModalHeader>
        <ModalBody>
          <div className="text">???????? ?????????? ?????????? ???????? ???????? ????????????</div>
          <br />
          <div className="text">?????????? ?????????? ???? ??????????...</div>
        </ModalBody>
        <ModalFooter>
          <div onClick={openLogIn} className="enter-login">
            ????????????
          </div>
          <div onClick={handleOpenTwice} className="enter-tryagain">
            ?????? ????????
          </div>
        </ModalFooter>
      </Modal>
      <LogIn
        show={showLogIn}
        handlClose={closeLogIn}
        users={users}
        setUsers={setUsers}
      />
      <EnterWorker
        show={showEnterWorker}
        handleClose={closeEnterWorker}
        changeUser={changeUser}
      />
    </>
  );
}
