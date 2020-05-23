import React, { useState, useEffect } from "react";
import PlayingCard from "../PlayingCard/PlayingCard.component";
import "./blackjackPage.scss";
import { Button, makeStyles } from "@material-ui/core";
import createDeck from "./scripts/createDeck";
import AModal from "../AnnounceModal/AModal.component";
import header from "../SlotPage/img/neonblackjack.png";
import { connect } from "react-redux";
import { setChipCount } from "../../actions/setChips";
import axios from "axios";
import SignInPage from "../SignInPage/SignInPage.component";

const useStyles = makeStyles({
	hit: {
		background: "rgb(240, 65, 197)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 1px 5px 1px rgb(0, 0, 0)",
	},
	label: {
		textTransform: "capitalize",
	},
	stand: {
		background: "rgb(252, 245, 21)",
		borderRadius: 3,
		border: 0,
		height: 48,
		padding: "0 30px",
		boxShadow: "0 1px 5px 1px rgb(0, 0, 0)",
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

	useEffect(() => {
		window.document.body.scrollTo(0, 0);
	}, []);

	const resetAces = () => {
		for (const card of deck.cards) {
			if (card.description === "Ace") {
				card.points = 11;
			}
		}
	};
	const [doubleDownDisabled, doubleDownDisabledSet] = useState(true);
	const doubleDown = () => {
		doubleDownDisabledSet(true);
		const double = bet * 2;
		if (double <= props.chips) {
			setBet(double);
		} else {
			setBet(props.chips);
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

	const handleWinner = (winner = dealer, natural = false) => {
		if (winner === human && natural) {
			const chips = props.chips + bet * 1.5;
			props.dispatch(setChipCount(bet * 1.5));
			axios
				.put(`/chips/${props.user.uid}`, {
					chips,
				})
				.then(function (response) {
					console.log(response);
				});
		} else if (winner === human && !natural) {
			const chips = props.chips + bet;
			props.dispatch(setChipCount(bet));
			axios
				.put(`/chips/${props.user.uid}`, {
					chips,
				})
				.then(function (response) {
					console.log(response);
				});
		} else {
			const chips = props.chips - bet;
			props.dispatch(setChipCount(-bet));
			axios
				.put(`/chips/${props.user.uid}`, {
					chips,
				})
				.then(function (response) {
					console.log(response);
				});
		}
	};
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

		if (
			playerCardsState.handScore === 9 ||
			playerCardsState.handScore === 10 ||
			playerCardsState.handScore === 11
		) {
			doubleDownDisabledSet(false);
		}

		//Check for naturals
		if (
			playerCardsState.handScore === 21 &&
			dealerCardsState.handScore !== 21
		) {
			setAnnounceText("You got a natural!");
			handleWinner(human, true);
			resetGame();
		} else if (
			playerCardsState.handScore !== 21 &&
			dealerCardsState.handScore === 21
		) {
			setAnnounceText("Dealer scored a natural.");
			handleWinner();
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
		doubleDownDisabledSet(true);
		runningSet(false);
		playersTurnSet(false);
	};
	const playerBusted = (player) => {
		playersTurnSet(false);
		if (player === human) {
			setAnnounceText("You busted!");
			handleWinner();
		} else {
			setAnnounceText("Dealer busted");
			handleWinner(human);
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
		let newHand = [...dealerState.hand];
		let newHandScore = await getHandScore(newHand);

		if (newHandScore >= 22 && countAces(newHand) > 0) {
			//Do we need to convert aces?

			newHand = convertAces(newHand);
		}
		newHandScore = await getHandScore(newHand);
		if (newHandScore <= 16 && newHandScore <= playerCardsState.handScore) {
			newHand = await hit(newHand);
			newHandScore = await getHandScore(newHand);
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
	const checkWinner = async (dealerState) => {
		if (playerCardsState.handScore === dealerState.handScore) {
			setAnnounceText("Round tied");
			resetGame();
		} else if (playerCardsState.handScore > dealerState.handScore) {
			setAnnounceText("You win!");
			await handleWinner(human);
			resetGame();
		} else {
			setAnnounceText("Dealer won");
			await handleWinner();
			resetGame();
		}
	};
	if (!props.user) {
		return <SignInPage redirectURL="/blackjack" history={props.history} />;
	} else
		return (
			<div>
				<div
					className="title"
				>
					<center>
						<img className="titleimg" src={header}></img>
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

					<div className="doubleDownBox">
						<h2>Current Bet: {bet}</h2>
						<div className="doubleDownButtons">
							<Button className="chipButton" color="inherit">
								<img
									src="https://firebasestorage.googleapis.com/v0/b/casino-royale-9c472.appspot.com/o/gaming.svg?alt=media&token=3058a860-e55f-4cbb-aaf9-ee94e79433ce"
									style={{ height: "24px", width: "24px", marginRight: "1em" }}
								/>
								{props.chips ? props.chips : 0}
							</Button>
							<Button
								classes={{
									root: classes.hit, // class name, e.g. `classes-nesting-root-x`
									label: classes.label, // class name, e.g. `classes-nesting-label-x`
								}}
								id="doubleDown-button"
								variant="outlined"
								color="primary"
								disabled={doubleDownDisabled}
								onClick={doubleDown}
								style={{ margin: "0 1em", height: "4em", width: "7em" }}
								// onClick={() => {
								// 	if (playersTurn) {
								// 		runPlayerTurn();
								// 	}
								// }}
							>
								DOUBLE DOWN
							</Button>
						</div>
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
						<div className="player-buttons-container">
							<Button
								classes={{
									root: classes.hit, // class name, e.g. `classes-nesting-root-x`
									label: classes.label, // class name, e.g. `classes-nesting-label-x`
								}}
								id="hit-button"
								size="large"
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
								size="large"
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
			</div>
		);
}
const mapStateToProps = (state) => {
	return {
		chips: state.chips,
		user: state.user,
	};
};

export default connect(mapStateToProps)(BlackjackPage);