import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./modal.scss";
import Pricing from "../Pricing/Pricing.component";
import { Link } from "react-router-dom";

function getModalStyle() {
	const top = 40;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		textAlign: "center",
		backgroundColor: "black",
		borderRadius: "50px",
		border: "5px solid yellow",
		boxShadow: "0 2px 5px 2px yellow, inset 0 2px 5px 2px yellow",
		padding: theme.spacing(2, 4, 3),
		outline: 'none',
		color: "white",
	},
	root: {
		"& > *": {
			margin: ".5em auto",
			width: "100%",
			border: "none",
		},
		
	},
}));
export function BasicTextFields(props) {
	const classes = useStyles();
	const [error, errorSet] = useState(false);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const betAmount = Number(
					document.querySelector("#outlined-basic").value
				);
				if (props.chips > 50 && betAmount >= 50 && betAmount <= props.chips) {
					props.setBet(betAmount);
					props.handleClose();
				} else if (
					props.chips <= 50 &&
					betAmount >= 1 &&
					betAmount <= props.chips
				) {
					props.setBet(betAmount);
					props.handleClose(betAmount);
				} else if (betAmount < 50 && props.chips > 50) {
					errorSet(true);
					props.setErrorMessage("Minimum bet is 50!");
				} else if (betAmount <= 0) {
					errorSet(true);
					props.setErrorMessage("Minimum bet is 1!");
				} else if (betAmount > props.chips) {
					errorSet(true);
					props.setErrorMessage("You can't bet more than you have!");
				}
			}}
			className={classes.root}
			noValidate
			autoComplete="on"
		>
			<TextField
				type="number"
				min="50"
				error={error}
				autoFocus
				// onChange={(e) => console.log(e.target.value)}
				defaultValue={props.bet > 50 ? props.bet : 50}
				id="outlined-basic"
				label="Bet Amount"
				variant="outlined"
			/>
			<Button type="submit" variant="contained" style={{ backgroundColor: "rgb(253, 0, 248)" }}>
				Submit
			</Button>
		</form>
	);
}

export default function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	useEffect(() => {
		if (!props.running) {
			handleOpen();
			setErrorMessage(null);
		}
	}, [props.running]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (betAmount = props.bet) => {
		if (props.chips > 0 && betAmount <= props.chips) {
			setOpen(false);
			props.startGame();
		}
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			{props.chips > 0 ? (
				<div>
					<h1 className="simple-modal-title">
						{props.announceText ? props.announceText : "Place your bet"}
					</h1>
					<BasicTextFields
						handleClose={handleClose}
						setBet={props.setBet}
						bet={props.bet}
						chips={props.chips}
						setErrorMessage={setErrorMessage}
					/>
					<h1 id="error-message">{errorMessage}</h1>{" "}
				</div>
			) : (
				<div style={{ width: "100%" }}>
					<h1 className="simple-modal-title">
						{props.announceText ? props.announceText : "Place your bet"}
					</h1>
					<h1 className="simple-modal-title">
						Chips required to play Blackjack!
					</h1>
					<Pricing />
					<Button
						style={{ margin: "1em auto" }}
						variant="contained"
						color="primary"
					>
						<Link to="/cart">Go To Cart</Link>
					</Button>
				</div>
			)}
		</div>
	);

	return (
		<div>
			<Modal
				style={{top: "20%"}}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
