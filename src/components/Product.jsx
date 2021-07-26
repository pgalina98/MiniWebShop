import React from "react";
import Rating from "./Rating";

const Product = ({ product }) => {
  console.log("PRODUCT: ", product);

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
        <div className="card__body__price">{product.cijena} HRK</div>
      </div>
    </div>
  );
};

export default Product;
