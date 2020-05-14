const chipReducer = (state = null, action) => {
	switch (action.type) {
		case "SET_CHIP_COUNT":
			state = action.count;
			return state;

		default:
			return state;
	}
};

export default chipReducer;
