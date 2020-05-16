import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeCheckoutButton({ price }) {
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_8YnJ2qrwK8OvwHr6kVbM4Lz400dBI7Jx8d";
	const onToken = (token) => {
		console.log(token);
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="Casion Royale"
			billingAddress
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
}
