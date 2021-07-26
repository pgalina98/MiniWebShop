import React from "react";
import Rating from "./Rating";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  const handleAddToCartClick = (event) => {
    console.log("ADD TO CART PRODUCT ", product.id);
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCartClick}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
