import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import flamingoicon from '../../images/flamingoicon.png'

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Casino Royale
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://i.ibb.co/8BrJJcd/flamingopattern.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "dark"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	cssLabel: {
		"&$cssFocused": {
		  color: { borderColor: "rgb(253, 0, 248)" }
		}
	  },
	  cssFocused: { borderColor: "rgb(253, 0, 248)" },
	  cssUnderline: {
		"&:after": {
		  borderBottomColor: "rgb(253, 0, 248)"
		}
	  },
	  cssOutlinedInput: {
		"&$cssFocused $notchedOutline": {
		  borderColor: "rgb(253, 0, 248)"
		}
	  },
	  notchedOutline: { borderColor: "rgb(253, 0, 248) !important" },
}));

export default function SignInSide(props) {
	const classes = useStyles();

	const [userData, userDataSet] = useState({ email: "", password: "" });
	const [error, setError] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = userData;
		let rURL;
		if (props.redirectURL) {
			rURL = props.redirectURL;
		} else {
			rURL = "/";
		}

		try {
			await auth.signInWithEmailAndPassword(email, password);
			// userDataSet({ email: "", password: "" });
			// setError("");
			setTimeout(props.history.push(rURL), 2000);
		} catch (error) {
			setError({ message: error.message });
		}
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<img src={flamingoicon} />
					<Typography component="h1" variant="h5">
					<p style={{ color: "rgb(253, 0, 248)" }}>Sign in</p>
					</Typography>
					<form
						className={classes.form}
						noValidate
						onChange={(e) => {
							userDataSet({ ...userData, [e.target.id]: e.target.value });
						}}
					>
						<TextField
					        InputLabelProps={{
								classes: {
								  root: classes.cssLabel,
								  focused: classes.cssFocused
								}
							  }}
							  InputProps={{
								classes: {
								  root: classes.cssOutlinedInput,
								  focused: classes.cssFocused,
								  notchedOutline: classes.notchedOutline
								}
							  }}		
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
					        InputLabelProps={{
								classes: {
								  root: classes.cssLabel,
								  focused: classes.cssFocused
								}
							  }}
							  InputProps={{
								classes: {
								  root: classes.cssOutlinedInput,
								  focused: classes.cssFocused,
								  notchedOutline: classes.notchedOutline
								}
							  }}						
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<div>
							<p
								style={{ marginTop: "1em", color: "red", textAlign: "center" }}
							>
								{error.message}
							</p>
						</div>
						<Button
							type="submit"
							fullWidth
							style={{ marginTop: "2em", backgroundColor: "#fd00f8"}}
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									href="#"
									onClick={(e) => {
										e.preventDefault();

										auth.sendPasswordResetEmail(userData.email);
									}}
									variant="body2"
								>
									<p style={{ color: "rgb(253, 0, 248)" }}>Forgot password?</p>
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
								<p style={{ color: "rgb(253, 0, 248)" }}>{"Don't have an account? Sign Up"}</p>
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
