import BlackJackPage from "../components/BlackJackPage/BlackjackPage.component";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import createDeck from "../components/BlackJackPage/scripts/createDeck";
import { screen, render } from "@testing-library/react";
import PlayingCard, {
	imageDict,
} from "../components/PlayingCard/PlayingCard.component";

describe("Playing cards", () => {
	const deck = createDeck();

	deck.shuffle();

	test(`playing cards render proper image`, () => {
		deck.cards.forEach((card) => {
			// console.log(card);
			render(
				<PlayingCard
					longString={card.toString()}
					shortString={card.shortString}
				/>
			);
			const pcImage = screen.getByRole("img", {
				name: card.toString(),
			});
			// let imageString = imageDict[card.shortString].slice(1);
			// console.log(pcImage.src);
			expect(pcImage.alt).toBe(card.toString());
		});
	});
});
