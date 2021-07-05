import React, { useState, useEffect } from "react";
import "./costumerOrders.css";
import { getOrders } from "../../../Service/orders";
import cloneDeep from "lodash/cloneDeep";
import Psotion from "../Postion/postion";
import Statuses from "./Statutses/statuses";

export default function CostumerOrders() {
  const [orders, setOrders] = useState([]);
  const [showOrder, setShowOrder] = useState({});

  useEffect(async () => {
    let order = await getOrders();
    const relevanrOrders = order.filter((order) => {
      return order.costumerId === JSON.parse(localStorage.user).id;
    });

    setOrders(relevanrOrders.reverse());
    let newShowes = {};
    orders.map((ord) => {
      newShowes[ord.id] = false;
    });
    setShowOrder(newShowes);
  }, []);

  function openAndCloseOredr(id) {
    let newShowes = cloneDeep(showOrder);
    newShowes[id] = !newShowes[id];
    setShowOrder(newShowes);
  }

  return (
    <div className="costumerOrder-contaner">
      <div className="costumerOrder-title">
        <p className="costumerOrder-text">שם המזמין</p>
        <p className="costumerOrder-text">תאריך ההזמנה</p>
        <p className="costumerOrder-text">שעת ההזמנה</p>
        <p className="costumerOrder-text">כתובת למשלוח</p>
      </div>
      {orders.map((order) => {
        return (
          <div className="costumerOrder-order">
            {!showOrder[order.id] && (
              <svg
                onClick={() => openAndCloseOredr(order.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="2vw"
                height="2vw"
                fill="currentColor"
                class="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
                color=" #f3cb16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            )}
            {showOrder[order.id] && (
              <svg
                onClick={() => openAndCloseOredr(order.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="2vw"
                height="2vw"
                fill="currentColor"
                class="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
                color=" #f3cb16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            )}

            <p className="costumerOrder-name">{order.costumerName}</p>
            <p className="costumerOrder-date">{order.date}</p>
            <p className="costumerOrder-time">{order.time}</p>
            <p className="costumerOrder-address">{order.address}</p>
            <Statuses status={order.status} />
            {showOrder[order.id] &&
              order.order.map((ord) => {
                return (
                  <Psotion
                    name={ord.nameItem}
                    times={ord.times}
                    price={ord.price}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
