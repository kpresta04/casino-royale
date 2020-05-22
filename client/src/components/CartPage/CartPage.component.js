import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import StripeCheckoutButton from "../stripe-button/stripe-button.component";
import "./cartPage.css";
import { deleteCartItem } from "../../actions/cartActions";
import carthead from "../../images/carthead.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

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
		// image: {
		// 	backgroundImage: 'url(https://i.ibb.co/8BrJJcd/flamingopattern.jpg)',
		// 	backgroundRepeat: 'no-repeat',
		// 	backgroundColor:
		// 	theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
		// 	backgroundSize: 'cover',
		// 	backgroundPosition: 'center',
		//   },
		  paper: {
			margin: theme.spacing(8, 4),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
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
		<Grid container component="main" className={classes.root}>
		<CssBaseline />
		<Grid item xs={false} sm={4} md={7} className={classes.image} />
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
		  <div className={classes.paper}>
		
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
			<div style={{ display: "flex", justifyContent: "center"}}>
				<StripeCheckoutButton history={props.history} price={total} />
			</div>
		</div>
		</div>
		</Grid>
		</Grid>
		</div>
	) : (
		<div className="cartBackground">
		<Grid container component="main" className={classes.root}>
		<CssBaseline />
		<Grid item xs={false} sm={4} md={7} className={classes.image} />
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
		<div className={classes.paper}>
		
		<div className="cartList">
			<h2>You have nothing in your cart!</h2>
		</div>
		
		</div>
		</Grid>
		</Grid>
		</div>
		

	);
	
}
const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart,
	chips: state.chips,
});

export default connect(mapStateToProps)(CartPage);
