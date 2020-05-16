const cartReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CART_ITEM":
			state = [...state, action.item];
			return state;

		case "DELETE_CART_ITEM":
			let stateArray = [...state];
			state = stateArray.filter((item) => item.id !== action.id);
			return state;

		case "RESET_CART":
			state = [];
			return state;

		default:
			return state;
	}
};

export default cartReducer;
