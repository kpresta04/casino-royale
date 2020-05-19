export const addToCart = (item) => ({
	type: "ADD_CART_ITEM",
	item,
});
export const deleteCartItem = (id) => ({
	type: "DELETE_CART_ITEM",
	id,
});

export const resetCart = () => ({
	type: "RESET_CART",
});

export const reloadSavedCart = (cart) => ({
	type: "RELOAD_CART",
	cart,
});
