import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: "wrap",
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === "dark"
				? theme.palette.grey[200]
				: theme.palette.grey[700],
		color: "white",
	},
	cardPricing: {
		display: "flex",
		justifyContent: "center",
		alignItems: "baseline",
		marginBottom: theme.spacing(2),
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

const tiers = [
	{
		title: "Entry Level",
		subheader: "Start Here",
		price: 10,
		description: ["1000 chips"],
		buttonText: "Add To Cart",
		amount: 1000,
		buttonVariant: "contained",
	},
	{
		title: "The Pro Player",
		subheader: "Most Popular",
		price: 25,
		amount: 3000,

		description: ["3000 chips"],
		buttonText: "Add To Cart",
		buttonVariant: "contained",
	},
	{
		title: "High Roller",
		subheader: "Best Value",
		price: 50,
		amount: 7500,
		description: ["7500 chips"],
		buttonText: "Add To Cart",
		buttonVariant: "contained",
	},
];
const footers = [
	{
		title: "Company",
		description: ["Team", "History", "Contact us", "Locations"],
	},
	{
		title: "Features",
		description: [
			"Cool stuff",
			"Random feature",
			"Team feature",
			"Developer stuff",
			"Another one",
		],
	},
	{
		title: "Resources",
		description: [
			"Resource",
			"Resource name",
			"Another resource",
			"Final resource",
		],
	},
	{
		title: "Legal",
		description: ["Privacy policy", "Terms of use"],
	},
];

function Pricing(props) {
	const classes = useStyles();
	const handleAddToCart = async (tier) => {
		const item = {
			price: tier.price,
			amount: tier.amount,
			description: tier.description[0],
			id: Date.now(),
		};
		await props.dispatch(addToCart(item));
	};

	return (
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{tiers.map((tier) => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === "Enterprise" ? 12 : 6}
							md={4}
						>
							<Card
								style={{
									backgroundColor: "white",
									opacity: "90%",
									onHover: "opacity: 100%",
								}}
							>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: "center" }}
									subheaderTypographyProps={{ align: "center", text: "black" }}
									action={tier.title === "Pro" ? <StarIcon /> : null}
									className={classes.cardHeader}
									style={{ backgroundColor: "#f50057", text: "white" }}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
									</div>
									<ul>
										{tier.description.map((line) => (
											<Typography
												component="li"
												variant="subtitle1"
												align="center"
												key={line}
											>
												{line}
											</Typography>
										))}
									</ul>
								</CardContent>
								<CardActions>
									<Button
										onClick={() => {
											if (props.user) {
												handleAddToCart(tier);
											}
										}}
										fullWidth
										variant={tier.buttonVariant}
										// variant="outlined"
										color="secondary"
									>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			{/* Footer */}

			{/* End footer */}
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart,
	};
};

export default connect(mapStateToProps)(Pricing);
