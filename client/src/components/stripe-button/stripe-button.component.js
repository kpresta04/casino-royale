import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { setChipCount } from "../../actions/setChips";
import { resetCart } from "../../actions/cartActions";

function StripeCheckoutButton(props) {
	const priceForStripe = props.price * 100;
	const publishableKey = "pk_test_8YnJ2qrwK8OvwHr6kVbM4Lz400dBI7Jx8d";
	const onToken = (token) => {
		const chipsTotal = () => {
			let chipAmount = 0;
			props.cart.forEach((element) => {
				chipAmount += element.amount;
			});
			return chipAmount;
		};
		//add chips

		props.dispatch(setChipCount(chipsTotal()));

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
	};
};

export default connect(mapStateToProps)(StripeCheckoutButton);
