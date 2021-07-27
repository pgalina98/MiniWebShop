import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_ORDER_DETAILS,
  CART_SAVE_DISCOUNT_CODE,
  CART_EMPTY,
} from "../constants/cartConstants";
import api from "../utils/api";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await api.get(`/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
        naziv: data.naziv,
        brand: data.brand,
        cijena: data.cijena,
        dostupnaKolicina: data.dostupnaKolicina,
        kolicina: quantity,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart));
  };

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem("paymentDetails", JSON.stringify(data));
};

export const saveDiscountCode = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_DISCOUNT_CODE, payload: data });

  localStorage.setItem("discountCode", JSON.stringify(data));
};

export const removeAllFromCart = () => async (dispatch) => {
  dispatch({ type: CART_EMPTY });

  localStorage.removeItem("cartItems");
  localStorage.removeItem("paymentDetails");
  localStorage.removeItem("discountCode");
};

export const saveOrderDetails = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_ORDER_DETAILS, payload: data });

  localStorage.setItem("orderDetails", JSON.stringify(data));
};
