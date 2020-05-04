import React, { useState } from "react";
import createDeck from "../components/BlackJackPage/scripts/createDeck";
import BlackjackContext from "./BlackjackContext";

export default function BlackjackProvider(props) {
	const [deck, setDeck] = useState(createDeck);
	const [playerCardsState, playerCardsSet] = useState([]);
	const [dealerCardsState, dealerCardsSet] = useState([]);
	const [dealerHandScore, dealerHandScoreSet] = useState(0);
	const [playerHandScore, playerHandScoreSet] = useState(0);
	const [running, runningSet] = useState(false);
	const context = {
		deck,
		setDeck,
		playerCardsState,
		playerCardsSet,
		dealerCardsState,
		dealerCardsSet,
		dealerHandScore,
		dealerHandScoreSet,
		playerHandScore,
		playerHandScoreSet,
		running,
		runningSet,
	};
	return (
		<BlackjackContext.Provider value={context}>
			{props.children}
		</BlackjackContext.Provider>
	);
}
