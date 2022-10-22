import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import API from "../../../../../API";

export const getSubscriptions = createAsyncThunk(
  "admin/subscriptions",
  async () => {
    const data = await API.fetchAllSubscriptions();
    console.log("fetched subscriptions: ", data);
    return data;
  }
);

export const getOneSubscription = createAsyncThunk(
  "admin/subscription",
  async (subscriptionId) => {
    const data = await API.fetchOneSubscription(subscriptionId);
    return data;
  }
);

const subscriptionsAdapter = createEntityAdapter({});

export const {
  selectAll: selectSubscriptions,
  selectById: selectSubscriptionById,
} = subscriptionsAdapter.getSelectors((state) => state.subscriptions);

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getSubscriptions.pending]: (state, action) => {
      console.log("fetching subscriptions.....");
    },
    [getSubscriptions.fulfilled]: (state, action) => {
      console.log("action.payload: ", action.payload);
    },
  },
});

export default subscriptionsSlice.reducer;
