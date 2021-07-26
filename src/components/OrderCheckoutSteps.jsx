import React from "react";

export default function OrderCheckoutSteps(props) {
  return (
    <div className="row checkout__steps">
      <div className={props.step1 ? "active" : ""}>Order Details</div>
      <div className={props.step2 ? "active" : ""}>Payment Method</div>
      <div className={props.step3 ? "active" : ""}>Discount Code</div>
      <div className={props.step4 ? "active" : ""}>Place Order</div>
    </div>
  );
}
