import { cartQuery } from "../cartQuery";

let syncTimeout = null;

export const cartSyncConfig = (store) => (next) => (action) => {
  const result = next(action);

  const syncActions = [
    "cart/addItem",
    "cart/removeItem",
    "cart/removeListItem",
    "cart/updateQuantityItem",
  ];

  if (syncActions.includes(action.type)) {
    const state = store.getState().cart;
    const user = store.getState().auth.currentUser;

    if (user) {
      if (syncTimeout) {
        clearTimeout(syncTimeout);
      }

      syncTimeout = setTimeout(() => {
        store.dispatch(
          cartQuery.endpoints.createOrupdateCart.initiate({
            items: state.items,
            totalQuantity: state.totalQuantity,
            totalPrice: state.totalPrice,
          }),
        );
      }, 800);
    }
  }

  return result;
};
