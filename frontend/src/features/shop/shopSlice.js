import { createSlice } from "@reduxjs/toolkit";
import { shopQuery } from "../api/shopQuery";

const savedShop = JSON.parse(localStorage.getItem("shop"));

const initialState = {
  currentShop: savedShop || null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clear: (state, action) => {
      state.currentShop = null;
      localStorage.removeItem("shop");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      shopQuery.endpoints.checkShop.matchFulfilled,
      (state, { payload }) => {
        state.currentShop = payload;
        localStorage.setItem("shop", JSON.stringify(payload));
      },
    );
    builder.addMatcher(
      shopQuery.endpoints.registerShop.matchFulfilled,
      (state, { payload }) => {
        state.currentShop = payload;
        localStorage.setItem("shop", JSON.stringify(payload));
      },
    );
  },
});

export const { set, clear } = shopSlice.actions;
export default shopSlice.reducer;
