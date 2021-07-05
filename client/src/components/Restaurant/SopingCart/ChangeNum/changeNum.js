import React from "react";
import "./changeNum.css";

export default function ChangeNum({ times, addItemNum, reduceItemNum }) {
  return (
    <div className="def-number-input number-input">
      <button className="plus" onClick={addItemNum}>
        +
      </button>
      <div className="quantity">{times}</div>
      <button className="minus" onClick={reduceItemNum}>
        -
      </button>
    </div>
  );
}
