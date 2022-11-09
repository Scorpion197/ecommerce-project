import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import API from "../../../../../API";
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getProduct = createAsyncThunk(
  "eCommerceApp/product/getProduct",
  async (productId) => {
    const response = await API.fetchOneProduct(productId);
    console.log("response: ", response);
    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "eCommerceApp/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "eCommerceApp/product/saveProduct",
  async (productData, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp;
    delete productData.created_at;
    //let formData = new FormData();
    //formData.append("name", productData.name);
    //formData.append("price", productData.price);
    //formData.append("quantity", productData.quantity);
    //formData.append("color", product.color);

    const response = await API.updateProduct(productData);
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  "ecommerceApp/product/newProduct",
  async (productData) => {
    const response = await API.addNewProduct(productData);
    console.log("response: ", response);
    return response;
  }
);
const productSlice = createSlice({
  name: "eCommerceApp/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: "",
          categorie:"",
          color:"",
          barcode:"",
          sku:"",
          quantity:0,
          price:0,
          images:[]

        },
      }),
    },
    pushImageToProduct:(state,action)=>{
      state.images.push(action.payload)
    }
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) =>{ 
    
      state = {...state,...action.payload}
      
    },
    [addNewProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct,pushImageToProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
