import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "../reducers/cartReducer";

const initalState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  orderDetails: localStorage.getItem("orderDetails")
    ? localStorage.getItem("orderDetails")
    : {},

  paymentDetails: localStorage.getItem("paymentDetails")
    ? localStorage.getItem("paymentDetails")
    : {},

  discountCode: localStorage.getItem("discountCode")
    ? localStorage.getItem("discountCode")
    : {},
};

const composeEnhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  cartReducer,
  initalState,
  composeEnhancher(applyMiddleware(thunk))
);

export default store;
