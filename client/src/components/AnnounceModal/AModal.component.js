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
		width: 400,
		textAlign: "center",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	root: {
		"& > *": {
			margin: ".5em auto",
			width: "100%",
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
				if (props.chips > 0 && betAmount >= 50 && betAmount <= props.chips) {
					props.setBet(betAmount);
					props.handleClose();
				} else if (betAmount < 50) {
					errorSet(true);
					props.setErrorMessage("Minimum bet is 50!");
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
				// onChange={(e) => console.log(e.target.value)}
				defaultValue={props.bet > 50 ? props.bet : 50}
				id="outlined-basic"
				label="Bet Amount"
				variant="outlined"
			/>
			<Button type="submit" variant="contained" color="primary">
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

	const handleClose = () => {
		if (props.chips > 0) {
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
