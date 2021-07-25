import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    console.log("CART: ", cartItems);
  }, [cartItems]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty.{" "}
            <Link to="/">
              Go Shopping
              <ShoppingCartIcon style={{ marginLeft: "10px" }} />
            </Link>
          </MessageBox>
        ) : (
          <p>TODO</p>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
