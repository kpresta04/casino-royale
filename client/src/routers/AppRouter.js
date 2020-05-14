import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BlackjackPage from "../components/BlackJackPage/BlackjackPage.component";
import SlotPage from "../components/SlotPage/SlotPage.component";
import SignUpPage from "../components/SignUpPage/SignUpPage.component";
import SignInPage from "../components/SignInPage/SignInPage.component";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { setUser } from "../actions/setUser";
import { connect } from "react-redux";

import App from "../App";

function AppRouter(props) {
	const [currentUser, currentUserSet] = useState(null);

	let unsubscribeFromAuth = null;

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			props.dispatch(setUser(user));
		});
		unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					currentUserSet({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
					// console.log(currentUser);
				});
			}
			currentUserSet({ currentUser: userAuth });
		});

		return () => {
			unsubscribeFromAuth();
			console.log("unsubbed");
		};
	}, []);
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={App} exact={true} />

					<Route path="/blackjack" component={BlackjackPage} />
					<Route path="/slots" component={SlotPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/signin" component={SignInPage} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(AppRouter);
