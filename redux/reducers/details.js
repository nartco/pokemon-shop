import actionTypes from "../actionTypes/details";
import getColorFromType from "../../components/utils/getColorFromType";

initialState = {
  pokemon: null,
  error: false,
  isLoading: true,
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POKEMON:
      pokemonTmp = action.pokemon;
      pokemonTmp.typeColor = getColorFromType(pokemonTmp.types[0].type.name);
      pokemonTmp.backgroundColor = getColorFromType(
        pokemonTmp.types[0].type.name,
        true
      );
      return {
        ...state,
        pokemon: action.pokemon,
        isLoading: false,
      };

    case actionTypes.ERROR_DETAILS:
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
    case actionTypes.CLEAR:
      return {
        ...state,
        pokemon: null,
        error: false,
        isLoading: true,
      };
    default:
      return state;
  }
};

export { detailsReducer as default };
