import mathRandom from "../../components/utils/mathRandom";
import actionTypes from "../actionTypes/home";

initialState = {
  pokeList: [],
  next: true,
  error: false,
  isLoading: true,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    //add a random price
    case actionTypes.GET_POKEMON_LIST:
      const listTmp = action.list.map((pokemon) => ({
        ...pokemon,
        price: mathRandom(),
      }));


      let pokeListTmp = state.pokeList ? state.pokeList : [];
      pokeListTmp = [...pokeListTmp, ...listTmp];

      return {
        ...state,
        pokeList: pokeListTmp,
        next: action.next ? true : false,
        error: false,
        isLoading: false,
      };
    case actionTypes.ERROR_HOME:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export { homeReducer as default };
