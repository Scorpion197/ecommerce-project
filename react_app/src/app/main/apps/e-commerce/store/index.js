import { combineReducers } from "@reduxjs/toolkit";
import order from "./orderSlice";
import orders from "./ordersSlice";
import product from "./productSlice";
import products from "./productsSlice";
import subscriptions from "./subscriptionsSlice";
const reducer = combineReducers({
  products,
  product,
  orders,
  order,
  subscriptions,
});

export default reducer;
