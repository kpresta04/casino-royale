const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_USER":
			state = action.user;
			console.log(state);
			return state;

		default:
			return state;
	}
};

export default userReducer;
