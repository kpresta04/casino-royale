import React from "react";
import Main from "./components/Main";
import { makeStyles, Button } from "@material-ui/core";
import "./App.css";
import { connect } from "react-redux";
import { auth } from "./firebase/firebase.utils";
import { setUser } from "./actions/setUser";
import Pricing from "./components/Pricing/Pricing.component";
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

function App(props) {
	return (
		<div className="App">
			<header className="App-header">
				<Main className="logo"></Main>
				<div className="mb-2">
					{props.user.currentUser ? (
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
				</div>
				<p className="scrolldown">
         			<a className="smoothscroll" href=".pricing"><i className="icon-down-circle"></i></a>
      			</p>
			</header>
			<div className="pricing">
				Pricing
			<Pricing />
			</div>
			<a href="/blackjack">
				<div className="Blackjack">Play Neon Blackjack</div>
			</a>
			<a href="/slots">
				<div className="Slots">Play Space Slots</div>
			</a>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(App);
