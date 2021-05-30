import { combineReducers } from "redux";
import themeReducer from "./theme";

const allReducers = combineReducers({
  themeReducer,
});

export default allReducers;
