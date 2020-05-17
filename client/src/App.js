import React, { useEffect } from "react";
import Main from "./components/Main";
import { makeStyles, Button } from "@material-ui/core";
import "./App.css";
import { connect } from "react-redux";
import { auth } from "./firebase/firebase.utils";
import { setUser } from "./actions/setUser";
import Pricing from "./components/Pricing/Pricing.component";
import { Link } from "react-router-dom";
import { reloadSavedCart } from "./actions/cartActions";
import axios from "axios";
import { reloadWallet } from "./actions/setChips";
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

function App(props) {
	useEffect(() => {
		// axios.get("/save").then(function (response) {
		// 	// handle success
		// 	console.log(response);
		// });
		if (props.user) {
			axios
				.get(`/chips/${props.user.uid}`)
				.then(function (response) {
					// handle success
					const dbObject = response.data;
					// console.log(dbObject);
					console.log(response);
					// if (dbObject) {
					// 	props.dispatch(reloadWallet(dbObject));
					// }
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
	}, [props.user]);
	return (
		<div className="App">
			<header className="App-header">
				<Main className="logo"></Main>
				<div className="mb-2">
					{props.user ? (
						""
					) : (
						<div>
							<Button
								className="mainbtn"
								size="large"
								variant="outlined"
								color="secondary"
								href="/signin"
							>
								Sign In
							</Button>
							<Button
								className="mainbtn"
								size="large"
								variant="outlined"
								color="secondary"
								href="/signup"
							>
								Sign Up
							</Button>
						</div>
					)}
					<Pricing />
				</div>
			</header>
			<Link to="/blackjack">
				<div className="Blackjack">blackjack pic place holder</div>
			</Link>

			<a href="/slots">
				<div className="Slots">slots pic place holder</div>
			</a>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart,
		chips: state.chips,
	};
};

export default connect(mapStateToProps)(App);
