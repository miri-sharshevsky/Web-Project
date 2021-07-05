export const getUsers = async () => {
  let res = await fetch("http://localhost:5000/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let users = await res.json();
  return users;
};

export const getUsersbyId = async (id, detailes) => {
  let res = await fetch("http://localhost:5000/users/:" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(detailes),
  });

  let user = await res.json();
  return user;
};

export const addNewUser = async (user) => {
  let res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let response = await res.json();
  return response;
};

export const changeUserPassword = async (id) => {
  let res = await fetch("http://localhost:5000/users/:" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await res.json();
  return response;
};

export const changeUserDetailes = async (id, newDetailes) => {
  let res = await fetch("http://localhost:5000/users/:" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDetailes),
  });
  let response = await res.json();
  return response;
};

