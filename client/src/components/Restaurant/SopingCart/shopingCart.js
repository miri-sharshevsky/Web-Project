import React, { useState } from "react";
import PaymentDetailes from "./PaymentDetailes/paymentDetailes.js";
import "./shopingCart.css";
import ChangeNum from "./ChangeNum/changeNum.js";

export default function ShopingCart({
  shoppingCart,
  total,
  setItemAmount,
  onUpdateCart,
  user,
}) {
  const [show, setShow] = useState(false);

  const handlOpen = () => setShow(true);
  const handlClose = () => setShow(false);

  return (
    <div className="shopingCart">
      <PaymentDetailes
        show={show}
        handlClose={handlClose}
        onUpdateCart={onUpdateCart}
        user={user}
      />
      <br />
      <div className="btn" onClick={handlOpen}>
        <div className="forPay-text">לתשלום</div>
      </div>
      <hr />
      <div>
        {shoppingCart != null &&
          shoppingCart.map((item, index) => {
            return (
              <div key={index}>
                <div className="shopingCart-cointener">
                  {item.nameItem} <br />{" "}
                  {item.price + String.fromCharCode(0x20aa)}
                </div>
                <ChangeNum
                  itemId={item.id}
                  times={item.times}
                  addItemNum={() => {
                    setItemAmount(item, Number(item.times) + 1);
                  }}
                  reduceItemNum={() => {
                    setItemAmount(item, Number(item.times) - 1);
                  }}
                />
                <small
                  className="removeItem"
                  onClick={() => setItemAmount(item, 0)}
                >
                  הסרה
                </small>
                <hr />
              </div>
            );
          })}
      </div>
      <small> סך כל ההזמנה {total + String.fromCharCode(0x20aa)}</small>
    </div>
  );
}
