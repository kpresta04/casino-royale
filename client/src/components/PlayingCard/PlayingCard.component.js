import React from "react";
export const imageDict = {
	Ac: "./Images/01_Ace_Clubs_100.png",
	Ad: "./Images/01_Ace_Diamonds.png",
	As: "./Images/01_Ace_Spades.png",
	Ah: "./Images/01_Ace_Hearts.png",
	"2c": "./Images/02_Clubs.png",
	"2d": "./Images/02_Diamonds.png",
	"2h": "./Images/02_Hearts.png",
	"2s": "./Images/02_Spades.png",
	"3c": "./Images/03_Clubs.png",
	"3d": "./Images/03_Diamonds.png",
	"3h": "./Images/03_Hearts.png",
	"3s": "./Images/03_Spades.png",
	"4c": "./Images/04_Clubs.png",
	"4d": "./Images/04_Diamonds.png",
	"4h": "./Images/04_Hearts.png",
	"4s": "./Images/04_Spades.png",
	"5c": "./Images/05_Clubs.png",
	"5d": "./Images/05_Diamonds.png",
	"5h": "./Images/05_Hearts.png",
	"5s": "./Images/05_Spades.png",
	"6c": "./Images/06_Clubs.png",
	"6d": "./Images/06_Diamonds.png",
	"6h": "./Images/06_Hearts.png",
	"6s": "./Images/06_Spades.png",
	"7c": "./Images/07_Clubs.png",
	"7d": "./Images/07_Diamonds.png",
	"7h": "./Images/07_Hearts.png",
	"7s": "./Images/07_Spades.png",
	"8c": "./Images/08_Clubs.png",
	"8d": "./Images/08_Diamonds.png",
	"8h": "./Images/08_Hearts.png",
	"8s": "./Images/08_Spades.png",
	"9c": "./Images/09_Clubs.png",
	"9d": "./Images/09_Diamonds.png",
	"9h": "./Images/09_Hearts.png",
	"9s": "./Images/09_Spades.png",
	"10c": "./Images/10_Clubs.png",
	"10d": "./Images/10_Diamonds.png",
	"10h": "./Images/10_Hearts.png",
	"10s": "./Images/10_Spades.png",
	Jc: "./Images/11_Jack_Clubs.png",
	Jd: "./Images/11_Jack_Diamonds.png",
	Jh: "./Images/11_Jack_Hearts.png",
	Js: "./Images/11_Jack_Spades.png",
	Qc: "./Images/12_Queen_Clubs.png",
	Qd: "./Images/12_Queen_Diamonds.png",
	Qh: "./Images/12_Queen_Hearts.png",
	Qs: "./Images/12_Queen_Spades.png",
	Kc: "./Images/13_King_Clubs.png",
	Kd: "./Images/13_King_Diamonds.png",
	Kh: "./Images/13_King_Hearts.png",
	Ks: "./Images/13_King_Spades.png",
};

export default function PlayingCard(props) {
	return (
		<img
			className={`fade-in-fast playingCard ${props.player}`}
			id={props.shortString}
			alt={props.longString}
			src={imageDict[props.shortString]}
		></img>
	);
}
