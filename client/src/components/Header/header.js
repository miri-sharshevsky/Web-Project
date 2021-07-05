import React, { useState } from "react";
import logo from "../../asset/imgs/logo.png";
import "./header.css";
import Enter from "./Enter/enter.js";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { ModalBody, ModalFooter, Navbar, Nav } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function Header({ changeUser, sighnOut }) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handlClose = () => setShow(false);
  const [showEnter, setShoeEnter] = useState(false);

  const openEnter = () => setShoeEnter(true);
  const closeEnter = () => setShoeEnter(false);

  if (!("user" in localStorage)) localStorage.user = "null";

  function sighnOutAndClose() {
    sighnOut();
    handlClose();
  }

  function getUserName() {
    if (JSON.parse(localStorage.user).worker === "worker") {
      return "עובד";
    } else {
      return JSON.parse(localStorage.user).name;
    }
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="header-contener"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="df" id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to="/Branches" className="header-link" as={Link}>
              סניפים
            </Nav.Link>
            <Nav.Link to="/Restaurant" className="header-link" as={Link}>
              תפריט
            </Nav.Link>
            <Nav.Link to="/aboutUs" className="header-link" as={Link}>
              מי אנחנו
            </Nav.Link>
            <Nav.Link to="/Contact" className="header-link" as={Link}>
              צור קשר
            </Nav.Link>
            <Nav.Link to="/Responses" className="header-link" as={Link}>
              תגובות
            </Nav.Link>
            {window.localStorage.user !== "null" &&
              JSON.parse(localStorage.user).worker === undefined && (
                <Nav.Link
                  to="/CostumerOrders"
                  className="header-link"
                  as={Link}
                >
                  הזמנות לקוח
                </Nav.Link>
              )}
            {window.localStorage.user !== "null" &&
              JSON.parse(localStorage.user).worker !== undefined && (
                <Nav.Link to="/WorkerOrders" className="header-link" as={Link}>
                  הזמנות לטיפול
                </Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
        {window.localStorage.user === "null" && (
          <div onClick={openEnter} className="loginIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
        )}

        {window.localStorage.user !== "null" && (
          <div>
            <div className="hellowUser" onClick={handleOpen}>
              <span className="helloUserContent"> {getUserName()}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
        )}
        <Navbar.Brand to="/" as={Link}>
          <img src={logo} className="img"></img>
        </Navbar.Brand>
      </Navbar>
      <Enter
        show={showEnter}
        handleClose={closeEnter}
        changeUser={changeUser}
        handleOpen={openEnter}
      />
      <Modal show={show} onHide={handlClose}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">
            הי{" "}
            {window.localStorage.user != "null" &&
              JSON.parse(localStorage.user).name}
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="text">האם אתה רוצה לצאת?</div>
        </ModalBody>
        <ModalFooter>
          <div className="secondary" onClick={sighnOutAndClose}>
            כן
          </div>
          <div className="secondary" onClick={handlClose}>
            לא
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
