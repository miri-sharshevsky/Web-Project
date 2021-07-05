import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Restaurant from "./components/Restaurant/restaurant.js";
import Header from "./components/Header/header.js";
import Home from "./components/Home/home.js";
import AboutUs from "./components/AboutUs/aboutUs.js";
import Contact from "./components/Contact/contact.js";
import Branches from "./components/Branches/branches.js";
import Footer from "./components/Footer/footer.js";
import Error from "./components/Error/error";
import React, { useState, useEffect } from "react";
import { getUsersbyId } from "./Service/users.js";
import Responses from "./components/Responses/responses";
import CostumerOrders from "./components/Orders/CostumerOrders/costumerOrders";
import WorkerOrders from "./components/Orders/WorkerOrders/workerOrders";
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();

  const [user, setUser] = useState();
  const [updateCart, setUpdateCart] = useState(false);

  const changeUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const sighnOut = () => {
    localStorage.user = "null";
    history.push("/");
    setUser(null);
  };
  const [userShoppingCart, setUserShoppingCart] = useState(null);

  useEffect(async () => {
    if (!("user" in localStorage)) localStorage.user = "null";
    if (localStorage.user == "null") setUserShoppingCart([]);
    else {
      let theUser = null;
      if (JSON.parse(localStorage.user).worker !== undefined) {
        theUser = { worker: "worker" };
      } else {
        theUser = await getUsersbyId(JSON.parse(localStorage.user).id, {
          detailes: "getForLocalStorage",
        });
      }

      setUser(theUser);
      setUserShoppingCart(theUser.shopingCart);
    }
  }, [updateCart]);

  useEffect(() => {
    if (!("user" in localStorage)) localStorage.user = "null";
    if (localStorage.user == "null") setUserShoppingCart([]);
    else if (user == null) {
      setUser(JSON.parse(localStorage.user));
      setUserShoppingCart(JSON.parse(localStorage.user).shopingCart);
    } else {
      localStorage.user = JSON.stringify(user);
      setUserShoppingCart(JSON.parse(localStorage.user).shopingCart);
    }
  }, [user]);

  return (
    <div className="App">
      <>
        <Header
          className="header"
          changeUser={changeUser}
          sighnOut={sighnOut}
        />
        <Switch>
          <Route exact path="/">
            {" "}
            <Home />{" "}
          </Route>
          <Route exact path="/Restaurant">
            <Restaurant
              shoppingCart={userShoppingCart}
              total={0}
              user={user}
              onUpdateCart={() => setUpdateCart(!updateCart)}
            />
          </Route>
          <Route path="/Branches">
            <Branches />
          </Route>
          <Route path="/aboutUs">
            <AboutUs />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Responses">
            <Responses />
          </Route>
          <Route path="/CostumerOrders">
            <CostumerOrders />
          </Route>
          <Route path="/WorkerOrders">
            <WorkerOrders />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer></Footer>
      </>
    </div>
  );
}

export default App;
