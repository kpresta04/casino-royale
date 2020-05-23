import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
	auth,
	createUserProfileDocument,
	signInWithGoogle,
} from "../../firebase/firebase.utils";
import alienicon from '../../images/alienicon.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Casino Royale
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
	height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.ibb.co/WpPMYFf/astronautpattern.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {
	"&$cssFocused": {
	  color: { borderColor: "green" }
	}
  },
  cssFocused: { borderColor: "green" },
  cssUnderline: {
	"&:after": {
	  borderBottomColor: "green"
	}
  },
  cssOutlinedInput: {
	"&$cssFocused $notchedOutline": {
	  borderColor: "green"
	}
  },
  notchedOutline: { borderColor: "green !important" },
}));

export default function SignInSide(props) {
	const classes = useStyles();
	const [error, setError] = useState(false);
	const [userData, userDataSet] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, email, password, confirmPassword } = userData;

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			setError({ message: "All fields are required" });
			return;
		}
		if (password !== confirmPassword) {
			setError({ passwordError: true, message: "Passwords don't match!" });
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, {
				displayName: userData.firstName,
			});

			userDataSet({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			setTimeout(props.history.push("/"), 2000);
		} catch (error) {
			setError({ message: error.message });
		}
	};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square  style={{backgroundColor: "#F5F5F5"}}>
        <div className={classes.paper}>
			<img src={alienicon} />
          <Typography component="h1" variant="h5">
		  <p  style={{ color: "green"}}>Sign Up</p>
          </Typography>
          <form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit}
					onChange={(e) => {
						userDataSet({ ...userData, [e.target.id]: e.target.value });
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
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
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								InputProps={{
									classes: {
									  notchedOutline: classes.notchedOutline,
									  cssOutlinedInput: classes.cssOutlinedInput,
									}
								  }}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
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
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								InputProps={{
									classes: {
									  notchedOutline: classes.notchedOutline,
									  cssOutlinedInput: classes.cssOutlinedInput,
									}
								  }}
							/>
						</Grid>
						<Grid item xs={12}>
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
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								InputProps={{
									classes: {
									  notchedOutline: classes.notchedOutline,
									  cssOutlinedInput: classes.cssOutlinedInput,
									}
								  }}
							/>
						</Grid>
						<Grid item xs={12}>
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
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								error={error.passwordError}
								InputProps={{
									classes: {
									  notchedOutline: classes.notchedOutline,
									  cssOutlinedInput: classes.cssOutlinedInput,
									}
								  }}
							/>
						</Grid>
						<Grid item xs={12}>
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
								required
								fullWidth
								name="confirmPassword"
								label="Confirm password"
								type="password"
								id="confirmPassword"
								autoComplete="current-password"
								error={error.passwordError}
								InputProps={{
									classes: {
									  notchedOutline: classes.notchedOutline,
									  cssOutlinedInput: classes.cssOutlinedInput,
									}
								  }}
							/>
						</Grid>
					</Grid>
					<div>
						<p style={{ marginTop: "1em", color: "red", textAlign: "center" }}>
							{error.message}
						</p>
					</div>
					<Button
						type="submit"
						fullWidth
						style={{ marginTop: "2em", backgroundColor: "green"}}
						variant="contained"
						color="primary"
					>
						Sign Up with Email
					</Button>
					{/* <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{ margin: "1em auto" }}
						onClick={async (e) => {
							e.preventDefault();
							await signInWithGoogle();
							setTimeout(props.history.push("/"), 2000);
						}}
					>
						Sign Up with Google
					</Button> */}
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								<p  style={{ color: "green"}}>Already have an account? Sign in</p>
							</Link>
						</Grid>
					</Grid>
				</form>
        </div>
        <Box mt={5}>
				<Copyright />
			</Box>
      </Grid>
    </Grid>
  );
}