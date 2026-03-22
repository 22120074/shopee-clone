import { createSlice } from "@reduxjs/toolkit";
import { cartQuery } from "../api/cartQuery";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) =>
          i.selectedAttributes.attribute.id ===
          item.selectedAttributes.attribute.id,
      );
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      state.totalQuantity += item.quantity || 1;
      state.totalPrice +=
        (item.selectedAttributes.attribute.price || 0) * (item.quantity || 1);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(
        (i) => i.selectedAttributes.attribute.id === id,
      );
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -=
          existingItem.selectedAttributes.attribute.price *
          existingItem.quantity;
        state.items = state.items.filter(
          (i) => i.selectedAttributes.attribute.id !== id,
        );
      }
    },
    removeListItem(state, action) {
      const listId = action.payload;
      state.items = state.items.filter(
        (i) => !listId.includes(i.selectedAttributes.attribute.id),
      );
      state.totalQuantity = state.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (acc, item) =>
          acc + item.selectedAttributes.attribute.price * item.quantity,
        0,
      );
    },
    updateQuantityItem(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(
        (i) => i.selectedAttributes.attribute.id === id,
      );
      if (existingItem && quantity > 0) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) *
          existingItem.selectedAttributes.attribute.price;
        existingItem.quantity = quantity;
      }
    },
    clearAllItem(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cartQuery.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload?.items || [];
          state.totalQuantity = payload?.totalQuantity || 0;
          state.totalPrice = payload?.totalPrice || 0;
        },
      )
      .addMatcher(
        cartQuery.endpoints.createOrupdateCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload?.items || [];
          state.totalQuantity = payload?.totalQuantity || 0;
          state.totalPrice = payload?.totalPrice || 0;
        },
      );
  },
});

export const {
  addItem,
  removeItem,
  removeListItem,
  updateQuantityItem,
  clearAllItem,
  loadItem,
} = cartSlice.actions;
export default cartSlice.reducer;
