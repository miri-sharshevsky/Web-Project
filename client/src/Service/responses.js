export const getResponses = async () => {
  let res = await fetch("http://localhost:5000/responses/" ,{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    }
});

let responses = await res.json();
return responses;
};

export const addResponse = async (response) => {
  await fetch("http://localhost:5000/Responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });
};
