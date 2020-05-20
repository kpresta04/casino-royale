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
import "./cartPage.css";
import { deleteCartItem } from "../../actions/cartActions";
import carthead from "../../images/carthead.png"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: "2em auto",
		maxWidth: 360,
        alignItems: 'center',
        justifyContent: 'center',

		typography: {
			// In Chinese and Japanese the characters are usually larger,
			// so a smaller fontsize may be appropriate.
			fontSize: 24,
		},
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
	const handleDelete = (id) => {
		props.dispatch(deleteCartItem(id));
	};
	useEffect(() => {
		setTotal(getTotal());
	}, [props.cart]);
	return props.cart.length > 0 ? (
		<div className="cartBackground">
		<div className="cartList">
			{/* Your Cart */}
			<img src={carthead} />
			<List dense className={classes.root}>
				{props.cart.map((item, index) => {
					const labelId = `checkbox-list-secondary-label-${item}`;
					return (
						<ListItem divider key={index} button>
							<ListItemText primary={"$" + item.price} />

							<ListItemText id={labelId} primary={item.description} />
							<ListItemSecondaryAction>
								<HighlightOffIcon
									className="delete-button"
									onClick={() => handleDelete(item.id)}
									edge="end"
								/>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
				<ListItem style={{ marginTop: "1.5em" }}>
					<ListItemText
						className="totalText"
						primary={`Total: $${total}`}
					></ListItemText>
				</ListItem>
			</List>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<StripeCheckoutButton history={props.history} price={total} />
			</div>
		</div>
		</div>
	) : (
		<div className="nothingBackground">
		<h1 className="emptyCartText">Nothing in your cart!</h1>
		</div>
	);
	
}
const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart,
	chips: state.chips,
});

export default connect(mapStateToProps)(CartPage);
