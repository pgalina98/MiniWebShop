import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;

      console.log("REDUCER ITEM: ", item);
      console.log("REDUCER STATE: ", state);

      const existItem = state.cart.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) => (x.id === existItem.id ? item : x)),
        };
      } else {
        console.log("dodajem");
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case CART_SAVE_PAYMENT_METHOD: {
      return { ...state, paymentMethod: action.payload };
    }

    case CART_EMPTY: {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};
