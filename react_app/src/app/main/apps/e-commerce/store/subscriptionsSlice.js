import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../../../API";
const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getSubscriptions = createAsyncThunk(
  "eCommerceApp/subscriptions/getSubscriptions",
  async () => {
    const data = await API.fetchAllSubscriptions();
    return data;
  }
);

export const removesubscriptions = createAsyncThunk(
  "eCommerceApp/subscriptions/removesubscriptions",
  async (orderIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/subscriptions", { data: orderIds });

    return orderIds;
  }
);

const subscriptionsAdapter = createEntityAdapter({});

export const {
  selectAll: selectSubscriptions,
  selectById: selectSubscriptionById,
} = subscriptionsAdapter.getSelectors(
  (state) => state.eCommerceApp.subscriptions
);

const subscriptionsSlice = createSlice({
  name: "eCommerceApp/subscriptions",
  initialState: subscriptionsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setsubscriptionsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getSubscriptions.fulfilled]: subscriptionsAdapter.setAll,
    [removesubscriptions.fulfilled]: (state, action) =>
      subscriptionsAdapter.removeMany(state, action.payload),
  },
});

export const { setsubscriptionsSearchText } = subscriptionsSlice.actions;

export const selectsubscriptionsSearchText = ({ eCommerceApp }) =>
  eCommerceApp.subscriptions.searchText;

export default subscriptionsSlice.reducer;
