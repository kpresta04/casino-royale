const cartReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CART_ITEM":
			state = [...state, action.item];
			return state;

		default:
			return state;
	}
};

export default cartReducer;
