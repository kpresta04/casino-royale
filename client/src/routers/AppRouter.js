import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BlackjackPage from "../components/BlackJackPage/BlackjackPage.component";
import SlotPage from "../components/SlotPage/SlotPage.component";
import SignUpPage from "../components/SignUpPage/SignUpPage.component";
import SignInPage from "../components/SignInPage/SignInPage.component";

import App from "../App";

export default function AppRouter() {
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
