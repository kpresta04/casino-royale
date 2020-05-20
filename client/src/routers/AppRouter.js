import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BlackjackPage from "../components/BlackJackPage/BlackjackPage.component";
import SlotPage from "../components/SlotPage/SlotApp";
import SignUpPage from "../components/SignUpPage/SignUpPage.component";
import SignInPage from "../components/SignInPage/SignInPage.component";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { setUser } from "../actions/setUser";
import { connect } from "react-redux";
import HeaderBar from "../components/HeaderBar/HeaderBar.component";
import CartPage from "../components/CartPage/CartPage.component";
import { reloadSavedCart } from "../actions/cartActions";
import axios from "axios";
import { reloadWallet } from "../actions/setChips";
import App from "../App";

function AppRouter(props) {
	const [currentUser, currentUserSet] = useState(null);

	let unsubscribeFromAuth = null;

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			props.dispatch(setUser(user));
			if (user) {
				axios
					.get(`/chips/${user.uid}`)
					.then(function (response) {
						// handle success
						const dbObject = response.data.chips;
						// console.log(dbObject);
						if (dbObject) {
							props.dispatch(reloadWallet(dbObject));
						}
					})
					.catch(function (error) {
						// handle error
						console.log(error);
					});
				const savedCart = JSON.parse(localStorage.getItem("myCart"));
				if (savedCart) {
					props.dispatch(reloadSavedCart(savedCart));
				}
			}
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
				<HeaderBar />
				<Switch>
					<Route path="/" component={App} exact={true} />
					<Route path="/blackjack" component={BlackjackPage} />
					<Route path="/slots" component={SlotPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/cart" component={CartPage} />
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
