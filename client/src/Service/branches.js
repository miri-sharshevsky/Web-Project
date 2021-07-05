export const getBranches = async () => {
  let res = await fetch("http://localhost:5000/branches/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let branches = await res.json();
  return branches;
};

export const getCloseBrunches = async (address) => {
  let res = await fetch("http://localhost:5000/branches/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  let branches = await res.json();
  return branches;

};
