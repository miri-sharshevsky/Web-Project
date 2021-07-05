import React, { useState } from "react";
import "./menuField.css";
import "./MenuFiledDetailes/menuFiledDetailes.css";
import MenuFiledDetailes from "./MenuFiledDetailes/menuFiledDetailes.js";

export default function MenuField({
  id,
  foodName,
  description,
  price,
  foodImg,
  changeItemNum,
}) {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="menuField" onClick={handleOpen}>
        <img className="foodImg" src={foodImg}></img>
        <div className="food">
          <div>{foodName}</div>
          <small> {description} </small>
          <br />
          <small>{price + String.fromCharCode(0x20aa)}</small>
        </div>
      </div>

      <MenuFiledDetailes
        id={id}
        foodName={foodName}
        description={description}
        price={price}
        foodImg={foodImg}
        handleClose={handleClose}
        show={show}
        changeItemNum={changeItemNum}
      />
    </>
  );
}
