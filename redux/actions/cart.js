import actionTypes from "../actionTypes/cart";

export const addToCart = (pokemon) => {
  return {
    type: actionTypes.ADD,
    pokemon,
  };
};

export const removeToCart = (id) => {
  return {
    type: actionTypes.REMOVE,
    id,
  };
};
