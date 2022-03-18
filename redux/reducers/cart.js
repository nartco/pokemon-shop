import actionTypes from "../actionTypes/cart";

initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      let productsTmp = state.products ? state.products : [];
      productsTmp.push(action.pokemon);
      return {
        ...state,
        products: productsTmp,
      };
    case actionTypes.REMOVE:
      let productsTmpRemove = state.products.filter(
        (product) => product.id !== action.id
      );

      return {
        ...state,
        products: productsTmpRemove,
      };
    default:
      return state;
  }
};

export { cartReducer as default };
