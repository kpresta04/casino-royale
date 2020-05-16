import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import StripeCheckoutButton from "../stripe-button/stripe-button.component";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "4em auto",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

export function CartPage(props) {
	const classes = useStyles();
	const [total, setTotal] = useState(0);
	const getTotal = () => {
		let total = 0;
		props.cart.forEach((element) => {
			total += element.price;
		});
		return total;
	};
	useEffect(() => {
		setTotal(getTotal());
	}, [props.cart]);
	return (
		<div>
			<List dense className={classes.root}>
				{props.cart.map((item, index) => {
					const labelId = `checkbox-list-secondary-label-${item}`;
					return (
						<ListItem divider key={index} button>
							<ListItemText primary={"$" + item.price} />

							<ListItemText id={labelId} primary={item.description} />
							<ListItemSecondaryAction>
								<HighlightOffIcon edge="end" />
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<StripeCheckoutButton />
				<h1>{total}</h1>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart,
	chips: state.chips,
});

export default connect(mapStateToProps)(CartPage);
