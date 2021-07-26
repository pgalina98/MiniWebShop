import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Button from "@material-ui/core/Button";

import { addToCart, removeFromCart } from "../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const isProductInCart = cart.filter((x) => x.id === product.id).length > 0;

  console.log("IN CART? ", isProductInCart);

  /*console.log("PRODUCT: ", product);
  console.log("CART: ", cart);*/

  const handleAddToCartClick = () => {
    console.log("ADD TO CART PRODUCT ", product.id);

    dispatch(addToCart(product.id));
  };

  const handleRemoveFromCart = () => {
    console.log("REMOVE PRODUCT FROM CART ", product.id);

    dispatch(removeFromCart(product.id));
  };

  return (
    <div key={product._id} className="card">
      <img
        className="medium"
        src={`./assets/products/${product.id}.jpg`}
        alt={product.naziv}
      />
      <div className="card__body">
        <h2>{product.naziv}</h2>
        <Rating rating={4.5} numberOfReviews={10} />
        <div className="card__body__footer">
          <div className="card__body__price">{product.cijena} HRK</div>
          {isProductInCart ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              endIcon={<RemoveShoppingCartIcon />}
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={product.dostupnaKolicina < 1}
              className={classes.button}
              endIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCartClick}
            >
              {product.dostupnaKolicina < 1 ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
