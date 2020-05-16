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
					<Typography variant="h6" className={classes.title}>
						<Link className="headerLinks" to="/">
							Home
						</Link>
					</Typography>

					{props.user ? (
						<div>
							<Button color="inherit">
								<ShoppingCartOutlinedIcon style={{ color: "white" }} />
								<Link style={{ color: "white" }} to="/cart">
									Cart ({props.cart.length})
								</Link>
							</Button>

							<Button
								onClick={() => {
									auth.signOut();
									// props.dispatch(setUser(null));
								}}
								color="inherit"
							>
								Sign Out
							</Button>
						</div>
					) : (
						<Button href="/signin" color="inherit">
							Login
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
	};
};

export default connect(mapStateToProps)(ButtonAppBar);
