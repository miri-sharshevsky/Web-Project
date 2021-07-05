import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
import { useHistory } from "react-router-dom";
import error from "../../asset/imgs/404.jpg";

export default function Error() {
  let history = useHistory();

  const out = () => history.push("/");
  return (
    <div className="error-contaner">
      <div className="error-btn" onClick={out}>
        חזרה לדףבית
      </div>

      <div
        className="error-img"
        style={{
          backgroundImage: `url(${error})`,
        }}
      ></div>
    </div>
  );
}
