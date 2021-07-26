import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import DiscountCodeScreen from "./screens/DiscountCodeScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  const cart = useSelector((state) => state.cart);

  return (
    <BrowserRouter>
      <div className="body__gridContainer">
        <header className="row">
          <div>
            <Link className="header__logo" to="/">
              shoppinger
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <ShoppingCartIcon
                style={{ height: "23px", width: "23px", marginRight: "15px" }}
              />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </Link>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/cart" component={CartScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/discountCode" component={DiscountCodeScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        </main>
        <footer className="row center">&copy; 2021. All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
