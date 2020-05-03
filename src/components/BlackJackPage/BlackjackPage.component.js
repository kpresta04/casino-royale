import React, { useState, useEffect } from "react";
import createDeck from "./scripts/createDeck";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";

import MaterialButton from "../Button/Button.component";

const deck = createDeck();

export default function BlackjackPage() {
	const [playerCardsState, playerCardsSet] = useState([]);
	const [dealerCardsState, dealerCardsSet] = useState([]);

	const [running, runningSet] = useState(false);

	// useEffect(() => {}, []);

	const startGame = () => {
		runningSet(true);

		const playerCardArray = [];
		const dealerCardArray = [];

		deck.deal(2, [playerCardArray, dealerCardArray]);

		playerCardsSet(playerCardArray);
		dealerCardsSet(dealerCardArray);
	};

	return (
		<div>
			<button
				onClick={() => {
					if (!running) {
						startGame();
					}
				}}
			>
				Start Game
			</button>

			<div className="playerCards">
				{playerCardsState.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>

			<div className="dealerCards">
				{dealerCardsState.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
		</div>
	);
}
