import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import API from "src/API";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    const data = await API.fetchAllProducts();
    console.log("fetched products: ", data);

    return data;
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products",
  async (productIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/products", { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) =>
  eCommerceApp.products.searchText;

export default productsSlice.reducer;
