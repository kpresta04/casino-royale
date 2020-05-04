import React, { useState, useEffect } from "react";
import createDeck from "./scripts/createDeck";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button } from "@material-ui/core";

export default function BlackjackPage() {
	let deck = createDeck();
	const [playerCardsState, playerCardsSet] = useState([]);
	const [dealerCardsState, dealerCardsSet] = useState([]);
	const [dealerHandScore, dealerHandScoreSet] = useState(0);
	const [playerHandScore, playerHandScoreSet] = useState(0);
	const [running, runningSet] = useState(false);

	useEffect(() => {
		if (!running) {
			startGame();
		}
	});

	const getHandScore = (hand) => {
		// Gets the score of each card
		let score = 0;
		hand.forEach((card) => {
			score += card.points;
		});
		return score;
	};
	useEffect(() => {
		//Tracking score of each hand
		let playerScore = getHandScore(playerCardsState);
		let dealerScore = getHandScore(dealerCardsState);
		playerHandScoreSet(playerScore);
		dealerHandScoreSet(dealerScore);
	}, [dealerCardsState, playerCardsState]);

	const startGame = () => {
		runningSet(true);
		deck = createDeck();

		const playerCardArray = [];
		const dealerCardArray = [];

		deck.deal(2, [playerCardArray, dealerCardArray]);

		playerCardsSet(playerCardArray);
		dealerCardsSet(dealerCardArray);
	};
	const hit = ([state, setter] = []) => {
		let cardArray = [...state];
		deck.deal(1, [cardArray]);
		setter(cardArray);
	};
	const runDealerTurn = () => {
		if (dealerHandScore <= 16) {
			hit([dealerCardsState, dealerCardsSet]);
			this.dealerScore = this.getHandScore(this.Dealer.hand1);
			this.dealerStrings = this.getHandStrings(this.Dealer.hand1);
			if (this.dealerScore > 21 && this.countAces(this.Dealer.hand1) > 0) {
				this.convertAces(this.Dealer.hand1);
				this.dealerScore = this.getHandScore(this.Dealer.hand1);
			}
			// $(".dealerHandScore").text(`Hand Score: ${this.dealerScore}`);

			setTimeout(() => this.runDealerTurn(), 1000);
		} else {
			this.checkForWinner();
		}
	};

	return (
		<div className="blackJackBoard">
			<div className="dealerCards">
				{dealerCardsState.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
			<div className="scoreBox">{<h2>Hand score: {dealerHandScore}</h2>}</div>
			<div className="scoreBox">{<h2>Hand score: {playerHandScore}</h2>}</div>

			<div className="playerCards">
				{playerCardsState.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
			<div className="playerButtons">
				<Button
					variant="contained"
					color="primary"
					style={{ margin: "0 3em", height: "3em", width: "6em" }}
					onClick={() => {
						if (running) {
							hit([playerCardsState, playerCardsSet]);
						}
					}}
				>
					HIT
				</Button>

				<Button
					style={{ margin: "0 3em", height: "3em", width: "6em" }}
					variant="contained"
				>
					STAND
				</Button>
			</div>
		</div>
	);
}
