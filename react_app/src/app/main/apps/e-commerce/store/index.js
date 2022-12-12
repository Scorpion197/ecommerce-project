import { combineReducers } from "@reduxjs/toolkit";
import order from "./orderSlice";
import orders from "./ordersSlice";
import product from "./productSlice";
import products from "./productsSlice";
import categories from './categoriesSlice'
const reducer = combineReducers({
  products,
  product,
  orders,
  order,
  categories

});

export default reducer;
