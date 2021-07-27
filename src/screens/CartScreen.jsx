import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";

import MessageBox from "../components/MessageBox";
import CartItem from "../components/CartItem";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart);

  const handleCheckoutOrder = () => {
    console.log("ORDER CHECKOUT ITEMS FROM CART");

    props.history.push("/shipping");
  };

  console.log("CART: ", cart);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        <Divider />
        {cart.length === 0 ? (
          <MessageBox>
            Cart is empty.{" "}
            <Link to="/">
              Go Shopping
              <ShoppingCartIcon style={{ marginLeft: "10px" }} />
            </Link>
          </MessageBox>
        ) : (
          <ul>
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card__body">
          <ul>
            {cart.map((cartItem) => (
              <li>
                <span className="cart__items">
                  <div>
                    <b>
                      {cartItem.naziv} ({cartItem.cijena} HRK ∗{" "}
                      {cartItem.kolicina} kom )
                    </b>
                  </div>
                  <div>
                    <b> = {cartItem.cijena * cartItem.kolicina} HRK</b>
                  </div>
                </span>
              </li>
            ))}
            <li>
              <Divider />
              <h2>
                Subtotal ({cart.reduce((a, c) => a + c.kolicina, 0)} items):{" "}
                {cart.reduce((a, c) => a + c.cijena * c.kolicina, 0)} HRK
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCheckoutOrder}
                className="primary block"
                disabled={cart.length === 0}
              >
                Proceed to Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
