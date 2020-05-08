import React, { useState, useEffect } from "react";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button } from "@material-ui/core";
import createDeck from "./scripts/createDeck";

const human = "human";
const dealer = "dealer";
export default function BlackjackPage() {
	// const Context = useContext(BlackjackState)
	const [announceText, setAnnounceText] = useState("");

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

	const resetAces = () => {
		for (const card of deck.cards) {
			if (card.description === "Ace") {
				card.points = 11;
			}
		}
	};

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
		if (getHandScore(cardArray) >= 22) {
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
	const updateState = async (hand, setter) => {
		let score = getHandScore(hand);

		await setter({ hand, handScore: score });
	};
	// const deal =(num,deck)=>{

	// }
	const startGame = async () => {
		runningSet(true);

		setAnnounceText("");

		await deck.reset();
		await deck.shuffle();
		await resetAces();

		const playerCardArray = [];
		const dealerCardArray = [];

		await deck.deal(2, [playerCardArray, dealerCardArray]);

		await updateState(playerCardArray, playerCardsSet);
		await updateState(dealerCardArray, dealerCardsSet);
		dealerCardsState.handScore = getHandScore(dealerCardArray);
		playerCardsState.handScore = getHandScore(playerCardArray);

		//Check for naturals
		if (
			playerCardsState.handScore === 21 &&
			dealerCardsState.handScore !== 21
		) {
			setAnnounceText("You got a natural!");
			resetGame();
		} else if (
			playerCardsState.handScore !== 21 &&
			dealerCardsState.handScore === 21
		) {
			setAnnounceText("Dealer scored a natural.");
			resetGame();
		} else if (
			playerCardsState.handScore === 21 &&
			dealerCardsState.handScore === 21
		) {
			setAnnounceText("You both scored naturals");
			resetGame();
		}
	};

	const resetGame = async () => {
		setTimeout(
			() => {
				startGame();
			},

			1500
		);
	};
	const playerBusted = (player) => {
		runningSet(false);
		if (player === human) {
			setAnnounceText("You busted!");
		} else {
			setAnnounceText("Dealer busted");
		}
		resetGame();
	};
	const hit = async (hand) => {
		let cardArray = [...hand];
		deck.deal(1, [cardArray]);

		//check if score over 21
		if (getHandScore(cardArray) >= 22 && countAces(cardArray) > 0) {
			//Do we need to convert aces?

			cardArray = convertAces(cardArray);
		}

		return cardArray;
	};
	const runDealerTurn = async (dealerState = dealerCardsState) => {
		if (dealerState.handScore <= 16) {
			let newHand = await hit(dealerState.hand);
			let newHandScore = await getHandScore(newHand);
			const newState = { hand: newHand, handScore: newHandScore };

			// dealerCardsSet(newState);
			updateState(newHand, dealerCardsSet);
			if (newHandScore <= 16) {
				setTimeout(() => runDealerTurn(newState), 1500);
			} else if (newHandScore > 21) {
				playerBusted(dealer);
			} else {
				//check for winner
				console.log("Checking winner");
			}
		}
	};
	const stand = () => {
		// runningSet(false);
		runDealerTurn();
	};
	const runPlayerTurn = async () => {
		const newHand = await hit(playerCardsState.hand);
		updateState(newHand, playerCardsSet);
		if (getHandScore(newHand) > 21) {
			playerBusted(human);
		}
	};
	return (
		<div className="blackJackBoard">
			<div className="dealerCards">
				{dealerCardsState.hand.map((card, index) => (
					<PlayingCard
						key={index}
						shortString={card.shortString}
						player={dealer}
					/>
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
					<PlayingCard
						key={index}
						shortString={card.shortString}
						player={human}
					/>
				))}
			</div>
			<h1 id="announce-text">{announceText}</h1>
			<div className="playerButtons">
				<Button
					id="hit-button"
					variant="contained"
					color="primary"
					style={{ margin: "0 3em", height: "3em", width: "6em" }}
					onClick={() => {
						if (running) {
							runPlayerTurn();
						}
					}}
				>
					HIT
				</Button>

				<Button
					style={{ margin: "0 3em", height: "3em", width: "6em" }}
					variant="contained"
					// disabled={!running}
					onClick={() => {
						if (running) {
							stand();
						}
					}}
				>
					STAND
				</Button>
			</div>
		</div>
	);
}
