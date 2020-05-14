import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCT_dyKsOa3jHVKk-JZ3lqRMR0SsGqgkHs",
	authDomain: "casino-royale-9c472.firebaseapp.com",
	databaseURL: "https://casino-royale-9c472.firebaseio.com",
	projectId: "casino-royale-9c472",
	storageBucket: "casino-royale-9c472.appspot.com",
	messagingSenderId: "215954069673",
	appId: "1:215954069673:web:7ccc98a04e382ec5d4b1b8",
	measurementId: "G-DQXK7HLYTK",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithEmail = (email) =>
	auth
		.sendSignInLinkToEmail(email)
		.then(function () {
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem("emailForSignIn", email);
		})
		.catch(function (error) {
			console.log(error);
		});

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user document", error.message);
		}
	}
	return userRef;
};

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
