import { createSlice } from "@reduxjs/toolkit";

const savedShop = JSON.parse(localStorage.getItem("shop"));

const initialState = {
  currentShop: savedShop || null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    set: (state, action) => {
      state.currentShop = action.payload;
      localStorage.setItem("shop", JSON.stringify(action.payload));
    },
    clear: (state, action) => {
      state.currentShop = null;
      localStorage.removeItem("shop");
    },
  },
});

export const { set, clear } = shopSlice.actions;
export default shopSlice.reducer;
