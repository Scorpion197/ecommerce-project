import { combineReducers } from "@reduxjs/toolkit";

import subscriptions from "./subscriptionsSlice";

const reducer = combineReducers({
  subscriptions,
});

export default reducer;
