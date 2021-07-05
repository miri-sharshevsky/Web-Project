import React, { useState, useEffect } from "react";
import "./workerOrders.css";
import { getOrders, changeOrder } from "../../../Service/orders";
import cloneDeep from "lodash/cloneDeep";
import Psotion from "../Postion/postion";
import statuses from "./statuses";

export default function WorkerOrders() {
  const [orders, setOrders] = useState([]);
  const [changes, setChanges] = useState(false);
  const [showOrder, setShowOrder] = useState({});

  useEffect(async () => {
    let order = await getOrders();
    setOrders(order);
    let newShowes = {};
    orders.map((ord) => {
      newShowes[ord.id] = false;
    });
    setShowOrder(newShowes);
  }, [changes]);

  function openAndCloseOredr(id) {
    let newShowes = cloneDeep(showOrder);
    newShowes[id] = !newShowes[id];
    setShowOrder(newShowes);
  }

  async function changeStatus(order) {
    if (order.status === "closes") {
      return;
    }
    let newOrder = order;
    if (order.status === "new") {
      newOrder.status = "packed";
    } else if (order.status === "packed") {
      newOrder.status = "sended";
    } else {
      newOrder.status = "closes";
    }
    await changeOrder(order.id, newOrder);
    setChanges(!changes);
  }
  return (
    <>
      <div className="workerOrder-title">
        <p className="workerOrder-text">שם המזמין</p>
        <p className="workerOrder-text">תאריך ההזמנה</p>
        <p className="workerOrder-text">שעת ההזמנה</p>
        <p className="workerOrder-text">כתובת למשלוח</p>
      </div>
      {statuses.map((status) => {
        return (
          <div className="WorkerOrder-contaner">
            <p className="workerOrders-statuses">{status.write}</p>

            {orders
              .filter((order) => {
                return order.status === status.status;
              })
              .map((order) => {
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
                    <div onClick={() => changeStatus(order)}>{status.icon}</div>
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
      })}
    </>
  );
}
