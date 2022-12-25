import { combineReducers } from "redux";
import ThemeReducer from "./ThemeReducer";
import subscriptionReducer from "../actions/subscriptions/subscriptionReducer";
import vendorsReducer from "../actions/vendors/vendorsReducer";
const rootReducer = combineReducers({
  ThemeReducer,
  subscriptionReducer,
  vendorsReducer,
});

export default rootReducer;
