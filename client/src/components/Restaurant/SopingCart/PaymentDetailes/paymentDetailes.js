import React, { useState, useEffect } from "react";
import { ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import "./paymentDetailes.css";
import logo from "../../../../asset/imgs/logo.png";
import { init } from "emailjs-com";
import { addOrder, getOrders } from "../../../../Service/orders";
import { useHistory } from "react-router";
import { changeUserDetailes, getUsersbyId } from "../../../../Service/users";
import { upDateErrorsPyMent } from "../../../../shered/validation";
import PaypalExpressBtn from "react-paypal-express-checkout";
init("user_nsntePLnPlCcZIxyNsYjQ");

export default function PaymentDetailes({
  user,
  show,
  handlClose,
  onUpdateCart,
}) {
  const date = new Date();

  const [detailes, setDetailes] = useState({
    phoneNumber: "",
    address: "",
    orderDate: date.getDate(),
    orderTime: date.getHours(),
    payType: "",
  });
  const [id, setId] = useState();

  const [errors, setErrors] = useState({});
  const [paid, setpaid] = useState(false);

  let history = useHistory();

  useEffect(async () => {
    let orders = await getOrders();
      setId(orders.length + 1);
    
  }, []);

  function upDateDetailes(event) {
    setDetailes({
      ...detailes,
      [event.target.name]: event.target.value,
    });
  }

  async function Approval() {
    let theUser = await getUsersbyId(JSON.parse(localStorage.user).id, {
      detailes: "getForLocalStorage",
    });
    let order = {
      id: id,
      costumerId: JSON.parse(localStorage.user).id,
      costumerName: JSON.parse(localStorage.user).name,
      address: detailes.address,
      phoneNumber: detailes.phoneNumber,
      date: detailes.orderDate,
      time: detailes.orderTime,
      price: theUser.globalPrice,
      order: theUser.shopingCart,
      status: "new",
      payType: detailes.payType,
    };
    let errors = upDateErrorsPyMent(order);
    setErrors(errors);
    if (errors.phoneNumber == undefined && errors.address == undefined && errors.payType == undefined && errors.order == undefined) {
      if (paid || detailes.payType === "מזומן") {
        let updateErrors = await addOrder(order);
        if (updateErrors === "ok") {
          handlClose();
          setId (id +1);
          history.push("/CostumerOrders");
          user.shoppingCart = [];

          await changeUserDetailes(JSON.parse(localStorage.user).id, {
            ...JSON.parse(localStorage.user),
            shopingCart: [],
            globalPrice: 0,
          });
          onUpdateCart();
        } else {
          setErrors(updateErrors);
        }
      }
    }
  }

  return (
    <Modal show={show} onHide={handlClose}>
      <ModalHeader className="paymentHeader">
        <img src={logo} className="paymentLogo" />
      </ModalHeader>
      <ModalBody className="detailes">
        <div className="bodyTitle">
          כדי שנוכל לשלוח לך את האוכל אנחנו צריכים כמה פרטים:
        </div>
        <hr />
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="מספר טלפון"
          className="payMent-from"
          onChange={upDateDetailes}
        />
        {errors.phoneNumber !== null && (
          <p className="errors">{errors.phoneNumber}</p>
        )}
        <input
          type="text"
          name="address"
          id="address"
          placeholder="כתובת למשלוח"
          className="payMent-from"
          onChange={upDateDetailes}
        />{" "}
        <p className="errors">{errors.address}</p>
        <input
          type="date"
          name="orderDate"
          id="orderDate"
          placeholder="תאריך הזמנה"
          className="payMent-from"
          onChange={upDateDetailes}
        />
        <p className="errors">{errors.orderDate}</p>
        <input
          type="time"
          name="orderTime"
          id="orderTime"
          placeholder="שעת ההזמנה"
          className="payMent-from"
          onChange={upDateDetailes}
        />
        <p className="errors">{errors.orderTime}</p>
        <div className="pay-type-container">
          <div>
            <input
              type="radio"
              id="paypal"
              name="payType"
              onChange={upDateDetailes}
              value="באמצעות Paypal"
            />
            <label htmlFor="paypal">באמצעות Paypal</label>
            {detailes.payType === "באמצעות Paypal" && (
              <PaypalExpressBtn
                env="sandbox"
                client={{
                  sandbox:
                    "AWyVyNng505zwdJcqk-SWIvGW6IMbvfHQtGbUt6jMLWWp95_xpevPeNjMgWI7l5T4H2Wi3C92ohhnCxT",
                  production: "YOUR-PRODUCTION-APP-ID",
                }}
                currency="ILS"
                total={JSON.parse(localStorage.user).globalPrice}
                onSuccess={() => setpaid(true)}
              />
            )}
          </div>
          <p className="errors">{errors.payType}</p>
          <div>
            <input
              type="radio"
              id="cash"
              name="payType"
              onChange={upDateDetailes}
              value="מזומן"
            />
            <label htmlFor="cash">מזומן</label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <p className="errors">{errors.order}</p>
        <div
          className="secondary"
          onClick={async () => {
            await Approval();
          }}
        >
          אישור
        </div>
      </ModalFooter>
    </Modal>
  );
}
