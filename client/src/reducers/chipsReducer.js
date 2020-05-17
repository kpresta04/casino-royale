const chipReducer = (state = null, action) => {
	switch (action.type) {
		case "SET_CHIP_COUNT":
			state += action.count;
			return state;

		case "RELOAD_WALLET":
			state = action.wallet;
			return state;

		default:
			return state;
	}
};

export default chipReducer;
