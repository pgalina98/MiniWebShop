import React from "react";

export default function OrderCheckoutSteps(props) {
  return (
    <div className="row checkout__steps">
      <div className={props.step1 ? "active" : ""}>Order Details</div>
      <div className={props.step2 ? "active" : ""}>Payment Type</div>
      <div className={props.step3 ? "active" : ""}>Place Order</div>
    </div>
  );
}
