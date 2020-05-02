import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BlackjackPage from "../components/BlackJackPage/BlackjackPage.component";
import App from "../App";

export default function AppRouter() {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={App} exact={true} />
					<Route path="/blackjack" component={BlackjackPage} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}
