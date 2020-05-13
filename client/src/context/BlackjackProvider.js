import React, { useState } from "react";
import createDeck from "../components/BlackJackPage/scripts/createDeck";
import BlackjackContext from "./BlackjackContext";

export default function BlackjackProvider(props) {
	const [deck, setDeck] = useState(createDeck);
	const [playerCardsState, playerCardsSet] = useState({
		hand: [],
		handScore: 0,
	});
	const [dealerCardsState, dealerCardsSet] = useState({
		hand: [],
		handScore: 0,
	});

	const [running, runningSet] = useState(false);
	const context = {
		deck,
		setDeck,
		playerCardsState,
		playerCardsSet,
		dealerCardsState,
		dealerCardsSet,
		running,
		runningSet,
	};
	return (
		<BlackjackContext.Provider value={context}>
			{props.children}
		</BlackjackContext.Provider>
	);
}
