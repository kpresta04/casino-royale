const cartReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CART_ITEM":
			state = [...state, action.item];
			localStorage.setItem("myCart", JSON.stringify(state));
			return state;

		case "DELETE_CART_ITEM":
			let stateArray = [...state];
			state = stateArray.filter((item) => item.id !== action.id);
			localStorage.setItem("myCart", JSON.stringify(state));

			return state;

		case "RESET_CART":
			state = [];
			localStorage.setItem("myCart", JSON.stringify(state));

			return state;
		case "RELOAD_CART":
			state = action.cart;
			return state;

		default:
			return state;
	}
};

export default cartReducer;
