export const getOrders = async () => {
  let res = await fetch("http://localhost:5000/orders/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let orders = await res.json();
  return orders;
};

export const getOrdersById = async (orderId) => {
  let res = await fetch("http://localhost:5000/orders/:" + orderId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let orders = await res.json();
  return orders;
};

export const addOrder = async (order) => {
  let res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  let response = await res.json();
  return response;
};

export const changeOrder = async (id, newDetailes) => {
  let res = await fetch("http://localhost:5000/orders/:" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDetailes),
  });
  let response = await res.json();
  return response;
};
