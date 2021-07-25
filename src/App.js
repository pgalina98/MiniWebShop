import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import CartScreen from "./screens/CartScreen";

function App() {
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
            </Link>
          </div>
        </header>
        <main>
          <Route path="/cart" component={CartScreen}></Route>
        </main>
        <footer className="row center">&copy; 2021. All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
