import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import MessageBox from "../components/MessageBox";
import { addToCart, removeFromCart } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CartScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemoveFromCart = (cartItem) => {
    console.log("REMOVE PRODUCT FROM CART ", cartItem.id);

    dispatch(removeFromCart(cartItem.id));
  };

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
            {cart.map((cartItem) => {
              return (
                <li key={cartItem.id + "ABCDE"}>
                  <div className="row">
                    <div>
                      <img
                        src={`./assets/products/${cartItem.id}.jpg`}
                        alt={cartItem.naziv}
                        className="small"
                      />
                    </div>
                    <div className="min-30">
                      <p>{cartItem.naziv}</p>
                    </div>
                    <div>
                      <select
                        value={cartItem.kolicina}
                        onChange={(e) =>
                          dispatch(
                            addToCart(cartItem.id, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(cartItem.dostupnaKolicina).keys()].map(
                          (x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    <div>{cartItem.cijena} HRK</div>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<RemoveShoppingCartIcon />}
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove from Cart
                      </Button>
                    </div>
                  </div>
                  <Divider />
                </li>
              );
            })}
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
