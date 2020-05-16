import { createStore, combineReducers } from "redux";

import userReducer from "../reducers/userReducer";
import cartReducer from "../reducers/cartReducer";
import chipsReducer from "../reducers/chipsReducer";

export default () => {
	const store = createStore(
		combineReducers({
			user: userReducer,
			cart: cartReducer,
			chips: chipsReducer,
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};
