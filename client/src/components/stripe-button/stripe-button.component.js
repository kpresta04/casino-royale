import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { setChipCount } from "../../actions/setChips";
import { resetCart } from "../../actions/cartActions";
import axios from "axios";

function StripeCheckoutButton(props) {
	const priceForStripe = props.price * 100;
	const publishableKey = "pk_test_8YnJ2qrwK8OvwHr6kVbM4Lz400dBI7Jx8d";
	const onToken = async (token) => {
		const chipsTotal = () => {
			let chipAmount = 0;
			props.cart.forEach((element) => {
				chipAmount += element.amount;
			});
			return chipAmount;
		};
		//add chips

		props.dispatch(setChipCount(chipsTotal()));
		// console.log(props.user.uid);
		const dbExists = await axios.get(`/chips/${props.user.uid}`);
		// console.log(dbExists);

		if (dbExists.data) {
			const chipsInCart = await chipsTotal();
			const chips = props.chips + chipsInCart;
			axios
				.put(`/chips/${props.user.uid}`, {
					chips,
				})
				.then(function (response) {
					console.log(response);
				});
		} else {
			axios
				.post("/chips", {
					userID: props.user.uid,
					chips: props.chips + chipsTotal(),
				})
				.then(function (response) {
					console.log(response);
				});
		}

		//save chips to database

		// empty cart

		props.dispatch(resetCart());

		// redirect to front page
		setTimeout(props.history.push("/"), 2000);
	};

	return (
		<StripeCheckout
			label="Checkout Now"
			name="Casion Royale"
			billingAddress
			description={`Your total is $${props.price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		chips: state.chips,
		cart: state.cart,
		user: state.user,
	};
};

export default connect(mapStateToProps)(StripeCheckoutButton);
