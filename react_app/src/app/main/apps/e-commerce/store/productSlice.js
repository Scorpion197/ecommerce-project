import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import API from "../../../../../API";
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (productId) => {
    const product = await API.fetchOneProduct(productId);
    const categories = await API.fetchProductCategories();
    console.log("getProduct", { categories, ...product });
    return { categories, ...product };
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    const response = await API.removeProduct(id);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "eCommerceApp/product/updateProduct",
  async (productData, { dispatch, getState }) => {
    const id = getState().eCommerceApp.product.id;
    const response = await API.updateProduct(id, productData);
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  "ecommerceApp/product/addNewProduct",
  async (productData) => {
    const response = await API.addNewProduct(productData);
    console.log("ecommerceApp/product/addNewProduct: ", productData, response);
    return response;
  }
);

export const newProduct = createAsyncThunk(
  "ecommerceApp/product/newProduct",
  async () => {
    const categories = await API.fetchProductCategories();
    console.log("response: ", categories);
    const getRandomCategory = () => {
      if (categories.length === 0) return "";

      return categories[Math.floor(Math.random() * (categories.length - 1))];
    };
    return {
      name: "",
      category: getRandomCategory(),
      color: "",
      barcode: "",
      sku: "",
      quantity: 0,
      weight: 0,
      price: 0,
      categories,
      images: [],
    };
  }
);
const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    [addNewProduct.fulfilled]: (state, action) => state,
    [updateProduct.fulfilled]: (state, action) => state,
    [removeProduct.fulfilled]: (state, action) => null,
    [newProduct.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
