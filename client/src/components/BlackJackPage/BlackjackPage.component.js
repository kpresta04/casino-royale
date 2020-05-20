import React, { useState, useEffect } from "react";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button, makeStyles } from "@material-ui/core";
import createDeck from "./scripts/createDeck";
import AModal from "../AnnounceModal/AModal.component";
import header from "../SlotPage/img/neonblackjack.png";
import { connect } from "react-redux";

const useStyles = makeStyles({
	hit: {
		background: "linear-gradient(45deg, #ff1dd5 10%, #000000 80%)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px #000000)",
	},
	label: {
		textTransform: "capitalize",
	},
	stand: {
		background: "linear-gradient(45deg, #000000 10%, #ffff00 80%)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgb(66, 65, 65)",
	},
});

const human = "human";
const dealer = "dealer";
function BlackjackPage(props) {
	// const Context = useContext(BlackjackState)
	const [announceText, setAnnounceText] = useState("");
	const [playersTurn, playersTurnSet] = useState(false);
	const [bet, setBet] = useState(50);
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

	useEffect(() => {}, []);

	const resetAces = () => {
		for (const card of deck.cards) {
			if (card.description === "Ace") {
				card.points = 11;
			}
		}
	};

	const classes = useStyles();

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
		playersTurnSet(true);

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
		// setTimeout(
		// 	() => {
		// 		startGame();
		// 	},

		// 	1500
		// );
		runningSet(false);
		playersTurnSet(false);
	};
	const playerBusted = (player) => {
		playersTurnSet(false);
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
		if (
			dealerState.handScore <= 16 &&
			dealerState.handScore <= playerCardsState.handScore
		) {
			let newHand = await hit(dealerState.hand);
			let newHandScore = await getHandScore(newHand);
			const newState = { hand: newHand, handScore: newHandScore };

			// dealerCardsSet(newState);
			updateState(newHand, dealerCardsSet);
			if (newHandScore <= 21) {
				setTimeout(() => runDealerTurn(newState), 1500);
			} else {
				//bust
				playerBusted(dealer);
			}
		} else {
			checkWinner(dealerState);
		}
	};
	const stand = () => {
		playersTurnSet(false);
		setTimeout(runDealerTurn, 1000);
	};
	const runPlayerTurn = async () => {
		const newHand = await hit(playerCardsState.hand);
		updateState(newHand, playerCardsSet);
		if (getHandScore(newHand) > 21) {
			playerBusted(human);
		}
	};
	const checkWinner = (dealerState) => {
		if (playerCardsState.handScore === dealerState.handScore) {
			setAnnounceText("Round tied");
			resetGame();
		} else if (playerCardsState.handScore > dealerState.handScore) {
			setAnnounceText("You win!");
			resetGame();
		} else {
			setAnnounceText("Dealer won");
			resetGame();
		}
	};
	return (
		<div>
			<div
				className="title"
				style={{
					backgroundColor: "#2d2d2d",
				}}
			>
				<center>
					<img src={header}></img>
				</center>
			</div>
			<div className="blackJackBoard">
				<div className="dealerCards">
					{playersTurn
						? dealerCardsState.hand.map((card, index) => {
								if (index === 0) {
									return (
										<PlayingCard
											key={index}
											shortString={card.shortString}
											player={dealer}
										/>
									);
								} else {
									return "";
								}
						  })
						: dealerCardsState.hand.map((card, index) => (
								<PlayingCard
									key={index}
									shortString={card.shortString}
									player={dealer}
								/>
						  ))}
				</div>
				<div className="scoreBox">
					{<h2>Hand score: {!playersTurn && dealerCardsState.handScore}</h2>}
				</div>
				<div className="scoreBox">
					{<h2>Your Score: {playerCardsState.handScore}</h2>}
				</div>

				<div className="playerCards">
					<AModal
						running={running}
						startGame={startGame}
						announceText={announceText}
						setBet={setBet}
						bet={bet}
						chips={props.chips}
					/>
					{playerCardsState.hand.map((card, index) => (
						<PlayingCard
							key={index}
							shortString={card.shortString}
							player={human}
						/>
					))}
				</div>
				{/* <h1 id="announce-text">{announceText}</h1> */}
				<div className="playerButtons">
					<Button
						classes={{
							root: classes.hit, // class name, e.g. `classes-nesting-root-x`
							label: classes.label, // class name, e.g. `classes-nesting-label-x`
						}}
						id="hit-button"
						variant="outlined"
						color="primary"
						style={{ margin: "0 1em", height: "3em", width: "7em" }}
						onClick={() => {
							if (playersTurn) {
								runPlayerTurn();
							}
						}}
					>
						HIT
					</Button>

					<Button
						classes={{
							root: classes.stand, // class name, e.g. `classes-nesting-root-x`
							label: classes.label, // class name, e.g. `classes-nesting-label-x`
						}}
						style={{
							margin: "0 1em",
							height: "3em",
							width: "7em",
						}}
						variant="contained"
						// disabled={!running}
						onClick={() => {
							if (playersTurn) {
								stand();
							}
						}}
					>
						STAND
					</Button>
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		chips: state.chips,
	};
};

export default connect(mapStateToProps)(BlackjackPage);
