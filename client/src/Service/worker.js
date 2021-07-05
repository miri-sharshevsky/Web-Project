export const isCorrectWorkerPassword = async (password) => {
  let res = await fetch("http://localhost:5000/worker/:" + password, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let response = await res.json();
  return response;
};
