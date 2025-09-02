import { createSlice } from '@reduxjs/toolkit';

const savedCart = JSON.parse(localStorage.getItem("cart"));

const initialState =  savedCart || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.selectedAttributes.attribute.id === item.selectedAttributes.attribute.id);
            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                state.items.push({ ...item, quantity: item.quantity || 1 });
            }
            state.totalQuantity += item.quantity || 1;
            state.totalPrice += (item.selectedAttributes.attribute.price || 0) * (item.quantity || 1);
            localStorage.setItem("cart", JSON.stringify({
                items: state.items,
                totalQuantity: state.totalQuantity,
                totalPrice: state.totalPrice
            }));
        },
        loadItem(state, action) {
            const cart = action.payload;
            state.items = cart.items || [];
            state.totalQuantity = cart.totalQuantity || 0;
            state.totalPrice = cart.totalPrice || 0;
            localStorage.setItem("cart", JSON.stringify({
                items: state.items,
                totalQuantity: state.totalQuantity,
                totalPrice: state.totalPrice
            }));
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(i => i.selectedAttributes.attribute.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.selectedAttributes.attribute.price * existingItem.quantity;
                state.items = state.items.filter(i => i.selectedAttributes.attribute.id !== id);
            }
            localStorage.setItem("cart", JSON.stringify({
                items: state.items,
                totalQuantity: state.totalQuantity,
                totalPrice: state.totalPrice
            }));
        },
        updateQuantityItem(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(i => i.selectedAttributes.attribute.id === id);
            if (existingItem && quantity > 0) {
                state.totalQuantity += quantity - existingItem.quantity;
                state.totalPrice += (quantity - existingItem.quantity) * existingItem.selectedAttributes.attribute.price;
                existingItem.quantity = quantity;
            }
            localStorage.setItem("cart", JSON.stringify({
                items: state.items,
                totalQuantity: state.totalQuantity,
                totalPrice: state.totalPrice
            }));
        },
        clearAllItem(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            localStorage.removeItem("cart");
        },
    },
});

export const { addItem, removeItem, updateQuantityItem, clearAllItem, loadItem } = cartSlice.actions;
export default cartSlice.reducer;