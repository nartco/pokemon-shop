import actionTypes from "../actionTypes/details";
import axios from "axios";
import { API_URL } from "@env";

export const getPokemon = (url) => {
  return async (dispatch) => {
    try {
      await axios.get(url).then(async (res) => {
        await dispatch({
          type: actionTypes.GET_POKEMON,
          pokemon: res.data,
        });
      });
    } catch (e) {
      dispatch({
        type: actionTypes.ERROR_DETAILS,
      });
    }
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const clear = () => {
  return {
    type: actionTypes.CLEAR,
  };
};
