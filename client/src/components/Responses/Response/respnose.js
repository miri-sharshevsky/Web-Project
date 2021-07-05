import React from "react";
import "./response.css";
import StarRatings from "react-star-ratings";

export default function Response({ name, response, rating }) {
  return (
    <div className="respnse-contaner">
      <p className="respnse-name">
        <p className="response-userIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2vw"
            height="2vw"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </p>
        {name}
      </p>

      <p className="response-response">
        <p className="response-responseIcon">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2vw"
            height="2vw"
            fill="currentColor"
            class="bi bi-hand-thumbs-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
          </svg>
        </p>
        {response}
      </p>
      <p className="response-response">
        <p className="response-responseIcon">
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
        <StarRatings
          rating={rating}
          starEmptyColor="black"
          starRatedColor="#f3cb16"
          starEmptyColor="gray"
          starHoverColor="#f3cb16"
          starDimension="1.5vw"
          starSpacing="0.25vw"
        />
      </p>
    </div>
  );
}
