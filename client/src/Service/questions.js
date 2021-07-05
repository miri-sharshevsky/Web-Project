export const getQustions = async () => {
  let res = await fetch("http://localhost:5000/questions/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let questions = await res.json();
  return questions;
};

export const addQuestions = async (question) => {
  await fetch("http://localhost:5000/Questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
};
