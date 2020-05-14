const userReducer = (state = { user: null, chips: null }, action) => {
	switch (action.type) {
		case "SET_USER":
			state = { currentUser: action.user, chips: state.chips };
			console.log(state);
			return state;

		case "SET_CHIP_COUNT":
			state = { currentUser: state.user, chips: action.count };
			return state;

		default:
			return state;
	}
};

export default userReducer;
