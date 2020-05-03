import React, { useState } from "react";
import createDeck from "./scripts/createDeck";
import PlayingCard from "../PlayingCard/PlayingCard.component";

const deck = createDeck();

export default function BlackjackPage() {
	const [playerCardsState, playerCardsSet] = useState([]);

	const playerCards = [];
	deck.deal(2, [playerCards]);

	console.log(playerCards);

	return <div>{<PlayingCard shortString={playerCards[0].shortString} />}</div>;
}
