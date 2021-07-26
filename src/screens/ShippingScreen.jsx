import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOrderDetails } from "../actions/cartActions";
import OrderCheckoutSteps from "../components/OrderCheckoutSteps";

const ShippingScreen = (props) => {
  const orderDetails = useSelector((state) => state.orderDetails);

  const [emailAddress, setEmailAddress] = useState(orderDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(orderDetails.brojMobitela);
  const [shippingAddress, setShippingAddress] = useState(
    orderDetails.adresaDostave
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveOrderDetails({
        emailAddress,
        phoneNumber,
        shippingAddress,
      })
    );

    props.history.push("/payment");
  };

  return (
    <div>
      <OrderCheckoutSteps step1 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Order Details</h1>
        </div>
        <div>
          <label htmlFor="emailAddress">Email address</label>
          <input
            type="text"
            id="emailAddress"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="shippingAddress">Shipping address</label>
          <input
            type="text"
            id="shippingAddress"
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
