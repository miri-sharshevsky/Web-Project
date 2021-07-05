import React, { useEffect, useState } from "react";
import "./restaurant.css";
import MenuField from "./MenuField/menuField.js";
import logo from "../../asset/imgs/logo.png";
import ShopingCart from "./SopingCart/shopingCart.js";
import { getMuneDetailes } from "../../Service/menu.js";
import { getUsersbyId } from "./../../Service/users";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { changeUserDetailes } from "./../../Service/users";
import { HashLink } from "react-router-hash-link";

export default function Restaurant({ shoppingCart, user, onUpdateCart }) {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [show, setShow] = useState(false);
  const handlClose = () => setShow(false);
  const [total, setTotal] = useState(0);
  useEffect(async () => {
    let details = await getMuneDetailes();
    setRestaurantMenu(details);
  }, []);

  useEffect(async () => {
    if (shoppingCart != null) {
      let newTotal = 0;
      shoppingCart.forEach((element) => {
        newTotal += element.price * element.times;
      });
      setTotal(newTotal);
    }
    if (JSON.parse(localStorage.user) != undefined) {
    }
  }, [shoppingCart]);

  const setItemAmount = async (item, newAmount) => {
    let index = shoppingCart.findIndex(
      (itemInCart) => item.itemId === itemInCart.itemId
    );
    if (newAmount === 0 && index !== -1) shoppingCart.splice(index, 1);
    else if (index !== -1)
      shoppingCart[index] = { ...shoppingCart[index], times: newAmount };
    else if (newAmount !== 0)
      shoppingCart.push({
        itemId: item.itemId,
        nameItem: item.nameItem,
        price: item.price,
        times: newAmount,
      });
    user.shopingCart = shoppingCart;

    let newTotal = 0;
    shoppingCart.forEach((element) => {
      newTotal += element.price * element.times;
    });
    setTotal(newTotal);
    user.globalPrice = newTotal;

    await changeUserDetailes(user.id, user);
    onUpdateCart();
  };

  return (
    <div className="container">
      <div className="top">
        <div className="resImg" />
        <img className="logo" src={logo}></img>
      </div>
      <div className="emtyDiv" />
      {restaurantMenu.map((item, index) => {
        return (
          <HashLink
            to={"#" + String(item.id)}
            className="resturant-category-hashlink"
            key={item.id}
          >
            {" " +
              item.kategory +
              " " +
              (index === restaurantMenu.length - 1 ? "" : "|")}
          </HashLink>
        );
      })}
      <div className="row">
        <div className="col-10">
          <div className="row">
            {restaurantMenu.map((item) => {
              return (
                <div id={item.id} key={item.id}>
                  <hr />
                  <div>{item.kategory}</div>
                  <hr />
                  <div className="row">
                    {item.menu.map((item1) => {
                      return (
                        <div className="col-3" key={item1.id}>
                          <MenuField
                            id={item1.id}
                            foodName={item1.foodName}
                            description={item1.description}
                            price={item1.price}
                            foodImg={item1.foodImg}
                            changeItemNum={(times) => {
                              if (
                                window.localStorage.user !== "null" &&
                                JSON.parse(localStorage.user).worker ===
                                  undefined
                              ) {
                                let index = shoppingCart.findIndex(
                                  (itemInCart) => item1.id === itemInCart.itemId
                                );
                                let amount;
                                if (index === -1) amount = times;
                                else
                                  amount =
                                    Number(shoppingCart[index].times) + times;
                                setItemAmount(
                                  {
                                    itemId: item1.id,
                                    nameItem: item1.foodName,
                                    price: item1.price,
                                  },
                                  amount
                                );
                              } else {
                                setShow(true);
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-2">
          <ShopingCart
            shoppingCart={shoppingCart}
            setItemAmount={setItemAmount}
            total={total}
            onUpdateCart={onUpdateCart}
            user={user}
          />
        </div>
      </div>
      <Modal show={show} onHide={handlClose}>
        <ModalHeader className="paymentHeader">
          <img src={logo} className="loginLogo" />
          <div className="loginHeader">הי</div>
        </ModalHeader>
        <ModalBody>
          <div className="text">עדיין לא נכנסת למערכת כלקוח</div>
          <div className="text">אינך יכול לבצע הזמנות</div>
          <div className="text">מחכים לך שתכנס</div>
        </ModalBody>
      </Modal>
    </div>
  );
}
