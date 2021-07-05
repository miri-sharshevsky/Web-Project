import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import home from "../../asset/imgs/home.jpg";

export default function Home() {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${home})`,
      }}
    >
      <div className="homeButtons">
        <Link className="headerButton1" to="/Branches">
          {" "}
          רוצים לבוא לקחת לבד מהסניף הקרוב?
        </Link>
        <Link className="headerButton2" to="/Restaurant">
          רוצים לקבל במשלוח ישיר מהתפריט שלנו?
        </Link>
      </div>
      <br />
    </div>
  );
}
