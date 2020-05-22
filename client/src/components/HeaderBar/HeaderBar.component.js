import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./headerBar.css";
import { auth } from "../../firebase/firebase.utils";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function ButtonAppBar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className="headerBar" position="static">
				<Toolbar>
					<Typography variant="h5" className={classes.title}>
						<Link className="headerLinks" to="/">
							HOME
						</Link>
					</Typography>

					{props.user ? (
						<div>
							<Button className="chipButton" color="inherit">
								<img
									src="https://firebasestorage.googleapis.com/v0/b/casino-royale-9c472.appspot.com/o/gaming.svg?alt=media&token=3058a860-e55f-4cbb-aaf9-ee94e79433ce"
									style={{ height: "24px", width: "24px", marginRight: "1em" }}
								/>
								{props.chips ? props.chips : 0}
							</Button>

							<Button color="inherit">
								<ShoppingCartOutlinedIcon />
								<Link style={{ color: "white", textDecoration: "none" }} to="/cart">
								<span className="buttonLabel">Cart ({props.cart ? props.cart.length : 0})</span>
								</Link>
							</Button>

							<Button
								onClick={() => {
									auth.signOut();
									// props.dispatch(setUser(null));
								}}
								color="inherit"
							>
								<span className="buttonLabel">Sign Out</span>
							</Button>
						</div>
					) : (
						<Button color="inherit">
							<Link style={{ color: "white", textDecoration: "none" }} to="/signin">
							<span className="buttonLabel">Login</span>
							</Link>
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart,
		chips: state.chips,
	};
};

export default connect(mapStateToProps)(ButtonAppBar);
