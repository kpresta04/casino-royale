import React, { useEffect } from "react";
import Main from "./components/Main";
import { makeStyles, Button } from "@material-ui/core";
import "./App.css";
import { connect } from "react-redux";
import { auth } from "./firebase/firebase.utils";
import { setUser } from "./actions/setUser";
import Pricing from "./components/Pricing/Pricing.component";
import { Link } from "react-router-dom";

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
		window.document.body.scrollTo(0, 0);
	}, []);
	// useEffect(() => {
	// axios.get("/save").then(function (response) {
	// 	// handle success
	// 	console.log(response);
	// });
	// if (props.user) {
	// 	axios
	// 		.get(`/chips/${props.user.uid}`)
	// 		.then(function (response) {
	// 			// handle success
	// 			const dbObject = response.data.chips;
	// 			// console.log(dbObject);
	// 			if (dbObject) {
	// 				props.dispatch(reloadWallet(dbObject));
	// 			}
	// 		})
	// 		.catch(function (error) {
	// 			// handle error
	// 			console.log(error);
	// 		});
	// 	const savedCart = JSON.parse(localStorage.getItem("myCart"));
	// 	if (savedCart) {
	// 		props.dispatch(reloadSavedCart(savedCart));
	// 	}
	// }
	// }, [props.user]);
	return (
		<div className="App">
			<header className="App-header">
				<Main className="logo"></Main>
				<div className="mb-2">
					{props.user ? (
						""
					) : (
						<div>
							{/* <Button
								className="mainbtn"
								size="large"
								variant="outlined"
								color="secondary"
								href="/signin"
							>
								Sign In
							</Button> */}
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
				</div>
				<p className="scrolldown">
					<a className="smoothscroll" href=".pricing">
						<i className="icon-down-circle"></i>
					</a>
				</p>
			</header>
			<div className="pricing">
				<div className="pricingtitle">Pricing</div>
				<Pricing />
			</div>
			<Link to="/blackjack">
				<div className="Blackjack">Play Neon Blackjack</div>
			</Link>
			<Link to="/slots">
				<div className="Slots">Play Space Slots</div>
			</Link>
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
