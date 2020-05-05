import React, { useState, useEffect, useContext } from "react";
import createDeck from "./scripts/createDeck";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button } from "@material-ui/core";
import BlackjackState from "../../context/BlackjackContext";

export default function BlackjackPage() {
	const Context = useContext(BlackjackState);

	useEffect(() => {
		startGame();
	}, []);

	const getHandScore = (hand) => {
		// Gets the score of each card
		let score = 0;
		hand.forEach((card) => {
			score += card.points;
		});
		return score;
	};
	const countAces = (hand) => {
		let aceCount = 0;
		for (const card of hand) {
			if (card.description === "Ace") {
				aceCount++;
			}
		}
		return aceCount;
	};

	// useEffect(() => {
	// 	//Tracking score of dealer hand

	// 	let dealerScore = getHandScore(Context.dealerCardsState);
	// 	Context.dealerHandScoreSet(dealerScore);
	// }, [Context.dealerCardsState]);
	// useEffect(() => {
	// 	const convertAces = () => {
	// 		//Make list of aces

	// 		const aceIndices = [];
	// 		let convertedHand = [...Context.playerCardsState];

	// 		//Convert 1 ace

	// 		convertedHand.forEach((card) => {
	// 			if (card.description === "Ace") {
	// 				aceIndices.push(convertedHand.indexOf(card));
	// 			}
	// 		});

	// 		if (aceIndices.length > 0) {
	// 			convertedHand[aceIndices[0]].points = 1;
	// 		}

	// 		console.log(getHandScore(convertedHand));

	// 		//If score still over 21, convert all aces
	// 		if (getHandScore(convertedHand) > 21) {
	// 			for (const card of convertedHand) {
	// 				if (card.description === "Ace") {
	// 					card.points = 1;
	// 				}
	// 			}
	// 		}

	// 		// return convertedHand;
	// 	};
	// 	//Tracking score of player hand

	// 	let playerScore = getHandScore(Context.playerCardsState);

	// 	Context.playerHandScoreSet(playerScore);
	// 	if (Context.playerHandScore > 21) {
	// 		convertAces();
	// 	}
	// }, [Context.playerCardsState]);
	const updateState = ([hand, setter] = []) => {
		let score = getHandScore(hand);

		setter({ hand, handScore: score });
	};
	// const deal =(num,deck)=>{

	// }
	const startGame = async () => {
		Context.runningSet(true);

		const playerCardArray = [];
		const dealerCardArray = [];

		Context.deck.deal(2, [playerCardArray, dealerCardArray]);

		updateState([playerCardArray, Context.playerCardsSet]);
		updateState([dealerCardArray, Context.dealerCardsSet]);
	};

	const hit = ([state, setter] = []) => {
		let cardArray = [...state.hand];
		Context.deck.deal(1, [cardArray]);
		updateState([cardArray, setter]);
	};
	const runDealerTurn = () => {
		if (Context.dealerHandScore <= 16) {
			// hit([dealerCardsState, dealerCardsSet]);

			this.dealerScore = this.getHandScore(this.Dealer.hand1);
			this.dealerStrings = this.getHandStrings(this.Dealer.hand1);
			if (this.dealerScore > 21 && this.countAces(this.Dealer.hand1) > 0) {
				this.convertAces(this.Dealer.hand1);
				this.dealerScore = this.getHandScore(this.Dealer.hand1);
			}
			// $(".Context.dealerHandScore").text(`Hand Score: ${this.dealerScore}`);

			setTimeout(() => this.runDealerTurn(), 1000);
		} else {
			// checkForWinner();
		}
	};

	return (
		<div className="blackJackBoard">
			<div className="dealerCards">
				{Context.dealerCardsState.hand.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
			<div className="scoreBox">
				{<h2>Hand score: {Context.dealerCardsState.handScore}</h2>}
			</div>
			<div className="scoreBox">
				{<h2>Hand score: {Context.playerCardsState.handScore}</h2>}
			</div>

			<div className="playerCards">
				{Context.playerCardsState.hand.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
			<div className="playerButtons">
				<Button
					id="hit-button"
					variant="contained"
					color="primary"
					style={{ margin: "0 3em", height: "3em", width: "6em" }}
					onClick={() => {
						if (Context.running) {
							hit([Context.playerCardsState, Context.playerCardsSet]);
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
