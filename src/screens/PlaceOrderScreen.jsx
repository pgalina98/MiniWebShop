import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import moment from "moment";

import { removeAllFromCart } from "../actions/cartActions";
import OrderCheckoutSteps from "../components/OrderCheckoutSteps";
import api from "../utils/api";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  const discountCode = useSelector((state) => state.discountCode)[0];

  const paymentMethodID = paymentDetails.paymentMethod === "Kartično" ? 1 : 2;
  const discountCodeID = discountCode?.id ? discountCode.id : "";

  const convertPrice = (number) => {
    return Number(number.toFixed(2));
  };

  cart.itemsPrice = convertPrice(
    cart.reduce((a, c) => a + c.kolicina * c.cijena, 0)
  );

  cart.totalPrice = cart.itemsPrice;
  cart.totalPriceWithDiscount = cart.itemsPrice;

  if (discountCode?.id) {
    cart.discount = cart.itemsPrice * discountCode.popust;

    cart.totalPriceWithDiscount = cart.totalPrice - cart.discount;
  }

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    const saveNewOrder = async () => {
      let now = new Date();
      var dateStringWithTime = moment(now).format("DD.MM.yyyy HH:mm:ss");

      const order = {
        popustKodId: discountCodeID,
        nacinPlacanjaId: paymentMethodID,
        ukupnaCijenaBezPopusta: cart.totalPrice,
        ukupnaCijenaSPopustom: cart.totalPriceWithDiscount
          ? cart.totalPriceWithDiscount
          : cart.totalPrice,
        datumKreiranjaNarudzbe: dateStringWithTime,
        datumAzuriranjaNarudzbe: dateStringWithTime,
        brojKartice: paymentDetails.creditCardNumber
          ? paymentDetails.creditCardNumber
          : "",
        email: orderDetails.emailAddress,
        brojMobitela: orderDetails.phoneNumber,
        adresaDostave: orderDetails.shippingAddress,
        napomena: "N/A",
      };

      console.log("ORDER: ", order);

      await api
        .post("/orders", order)
        .then(({ data }) => {
          console.log("DATA: ", data);
          saveOrderProducts(data);
        })
        .catch((error) => console.log("ERROR: ", error));
    };

    const saveOrderProducts = async (createdOrder) => {
      console.log("ORDER FOR ADD PRODUCTS: ", createdOrder);

      await api
        .post(
          `orders/${createdOrder.id}/products`,
          cart.map((product) => {
            product.dostupnaKolicina = product.kolicina;
            return product;
          })
        )
        .then(({ data }) => console.log("DATA: ", data))
        .catch((error) => console.log("ERROR: ", error));
    };

    saveNewOrder();

    dispatch(removeAllFromCart());

    props.history.push("/");
  };

  console.log("CART: ", cart);

  console.log(
    "CART UPDATED: ",
    cart.map((product) => {
      product.dostupnaKolicina = product.kolicina;
      console.log("UPDATED PRODUCT: ", product);

      return product;
    })
  );

  return (
    <div>
      <OrderCheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card__body">
                <h2>Shipping</h2>
                <Divider />
                <p>
                  <strong>Email address: </strong>
                  {orderDetails.emailAddress}
                  <br />
                  <br />
                  <strong>Phone number: </strong>
                  {orderDetails.phoneNumber}
                  <br />
                  <br />
                  <strong>Shipping address: </strong>
                  {orderDetails.shippingAddress}
                </p>
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Payment</h2>
                <Divider />
                <p>
                  <strong>Payment Method: </strong>
                  {paymentDetails.paymentMethod}
                </p>
                <br />
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Order Items</h2>
                <Divider />
                <ul>
                  {cart.map((cartItem) => {
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
                            {cartItem.kolicina} x {cartItem.cijena} HRK ={" "}
                            <b>{cartItem.kolicina * cartItem.cijena} HRK</b>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card__body">
            <ul>
              <li>
                <h2>Order Summary</h2>
                <Divider />
                <br />
              </li>
              <li>
                <div className="row">
                  <div>Items price</div>
                  <div>{cart?.itemsPrice?.toFixed(2)} HRK</div>
                </div>
                <br />
                <div className="row">
                  <div>Discount</div>
                  <div>
                    {isNaN(discountCode?.popust)
                      ? "0"
                      : discountCode.popust * 100}{" "}
                    %
                  </div>
                </div>
                <br />
                <div className="row">
                  <div>Discount amount</div>
                  <div>
                    {isNaN(cart?.discount?.toFixed(2))
                      ? "0"
                      : cart.discount.toFixed(2)}{" "}
                    HRK
                  </div>
                </div>
              </li>
              <br />
              <Divider />
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      {cart?.totalPriceWithDiscount.toFixed(2)} HRK
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
