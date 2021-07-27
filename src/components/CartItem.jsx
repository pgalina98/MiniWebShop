import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import { addToCart, removeFromCart } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CartItem({ cartItem }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    console.log("REMOVE PRODUCT FROM CART ", cartItem.id);

    dispatch(removeFromCart(cartItem.id));
  };

  return (
    <li key={cartItem.id}>
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
              dispatch(addToCart(cartItem.id, Number(e.target.value)))
            }
          >
            {[...Array(cartItem.dostupnaKolicina).keys()].map((x) => {
              return (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              );
            })}
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
}
