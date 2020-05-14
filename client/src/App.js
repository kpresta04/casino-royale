import React from "react";
import Main from "./components/Main";
import { makeStyles, Button } from "@material-ui/core";
import "./App.css";
import { connect } from "react-redux";
import { auth } from "./firebase/firebase.utils";
import { setUser } from "./actions/setUser";

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
						<Button
							className="mainbtn"
							size="large"
							variant="outlined"
							color="secondary"
							onClick={() => {
								auth.signOut();
								props.dispatch(setUser(null));
							}}
						>
							Sign Out
						</Button>
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
			</header>
			<a href="/blackjack">
				<div className="Blackjack">blackjack pic place holder</div>
			</a>
			<a href="https://johnfranke.github.io/slot-machine-rough-draft/">
				<div className="Slots">slots pic place holder</div>
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
