import { combineReducers } from "redux";
import homeReducer from "./home";
import detailsReducer from "./details";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  homeReducer,
  detailsReducer,
  cartReducer,
});
export default rootReducer;
