import actionTypes from "../actionTypes/home";
import axios from "axios";
import { API_URL } from "@env";

export const getPokemons = (page) => {
  return async (dispatch) => {
    try {
      await axios
        .get(`${API_URL}pokemon?offset=${page}&limit=20`)
        .then((res) => {
          dispatch({
            type: actionTypes.GET_POKEMON_LIST,
            list: res.data.results,
            next: res.data.next,
          });
        });
    } catch (e) {
      dispatch({
        type: actionTypes.ERROR_HOME,
      });
    }
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};
