import React, { useState, useEffect } from "react";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button } from "@material-ui/core";
import createDeck from "./scripts/createDeck";

export default function BlackjackPage() {
	// const Context = useContext(BlackjackState);
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
	const convertAces = (cardArray) => {
		//Make list of aces

		const aceIndices = [];

		//Convert 1 ace

		cardArray.forEach((card) => {
			if (card.description === "Ace") {
				aceIndices.push(cardArray.indexOf(card));
			}
		});

		if (aceIndices.length > 0) {
			cardArray[aceIndices[0]].points = 1;
		}

		//If score still over 21, convert all aces
		if (getHandScore(cardArray) > 21) {
			for (const card of cardArray) {
				if (card.description === "Ace") {
					card.points = 1;
				}
			}
		}

		return cardArray;
	};
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
		if (!running) {
			runningSet(true);
		}
		await deck.reset();
		await deck.shuffle();

		const playerCardArray = [];
		const dealerCardArray = [];

		await deck.deal(2, [playerCardArray, dealerCardArray]);

		// await deck.deal(2, [playerCardArray, dealerCardArray]);

		updateState([playerCardArray, playerCardsSet]);
		updateState([dealerCardArray, dealerCardsSet]);
	};

	const resetGame = async () => {
		setTimeout(
			() => {
				startGame();
			},

			1500
		);
	};
	const playerBusted = () => {
		console.log("You busted!");
		resetGame();
	};
	const hit = ([state, setter] = []) => {
		let cardArray = [...state.hand];
		deck.deal(1, [cardArray]);

		//check if score over 21
		if (getHandScore(cardArray) > 21 && countAces(cardArray) > 0) {
			//Do we need to convert aces?

			cardArray = convertAces(cardArray);
		}

		if (getHandScore(cardArray) > 21) {
			playerBusted();
		}

		updateState([cardArray, setter]);
	};
	const runDealerTurn = () => {
		if (dealerCardsState.handScore <= 16) {
			// hit([dealerCardsState, dealerCardsSet]);

			this.dealerScore = this.getHandScore(this.Dealer.hand1);
			this.dealerStrings = this.getHandStrings(this.Dealer.hand1);
			if (this.dealerScore > 21 && this.countAces(this.Dealer.hand1) > 0) {
				this.convertAces(this.Dealer.hand1);
				this.dealerScore = this.getHandScore(this.Dealer.hand1);
			}
			// $(".dealerHandScore").text(`Hand Score: ${this.dealerScore}`);

			setTimeout(() => this.runDealerTurn(), 1000);
		} else {
			// checkForWinner();
		}
	};

	return (
		<div className="blackJackBoard">
			<div className="dealerCards">
				{dealerCardsState.hand.map((card, index) => (
					<PlayingCard key={index} shortString={card.shortString} />
				))}
			</div>
			<div className="scoreBox">
				{<h2>Hand score: {dealerCardsState.handScore}</h2>}
			</div>
			<div className="scoreBox">
				{<h2>Hand score: {playerCardsState.handScore}</h2>}
			</div>

			<div className="playerCards">
				{playerCardsState.hand.map((card, index) => (
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
