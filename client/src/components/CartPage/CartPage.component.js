import React, { Component } from "react";
import { connect } from "react-redux";

export function CartPage() {
	return <div></div>;
}
const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart,
	chips: state.chips,
});

export default connect(mapStateToProps)(CartPage);
