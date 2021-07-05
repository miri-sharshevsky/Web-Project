import React, { useState, useEffect } from "react";
import "./responses.css";
import { getResponses, addResponse } from "../../Service/responses";
import NewResponse from "./NewResponse/newResponse";
import Response from "./Response/respnose";

export default function Responses() {
  const [responses, setResponses] = useState([]);
  const [showNewResponse, setShowNewResponse] = useState(false);
  const [changes, setChanges] = useState(false);

  const openNewResponse = () => setShowNewResponse(true);
  const closeNewResponse = () => setShowNewResponse(false);

  useEffect(async () => {
    let responsesArray = await getResponses();
    setResponses(responsesArray);
  }, [changes]);

  async function addNewResponse(response) {
    const newResponse = {
      name: JSON.parse(localStorage.user).name,
      response: response.response,
      rating: response.rating,
    };
    await addResponse(newResponse);
    setChanges(!changes);
  }
  return (
    <>
      <div className="responses-add" onClick={openNewResponse}>
        <p className="responses-rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2vw"
            height="2vw"
            fill="currentColor"
            class="bi bi-bar-chart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
          </svg>
        </p>
        דרגו אותנו
      </div>
      {responses.reverse().map((response) => {
        return (
          <Response
            name={response.name}
            response={response.response}
            rating={response.rating}
          />
        );
      })}
      <NewResponse
        show={showNewResponse}
        handleClose={closeNewResponse}
        addNewResponse={addNewResponse}
      />
    </>
  );
}
