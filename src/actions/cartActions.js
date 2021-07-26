import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
} from "../constants/cartConstants";
import api from "../utils/api";

export const addToCart = (productId) => async (dispatch, getState) => {
  const { data } = await api.get(`/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data.id,
      naziv: data.naziv,
      brand: data.brand,
      cijena: data.cijena,
      dostupnaKolicina: data.dostupnaKolicina,
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
};

export const removeAllFromCart = () => async (dispatch) => {
  dispatch({ type: CART_EMPTY });

  localStorage.removeItem("cartItems");
};
