const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const Wallet = require("./db/models/wallet");
const cors = require("cors");

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const db = require("./db"); // loads our connection to the mongo database

const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));
main.get("/hello", (req, res) => res.send("hello dawg"));

main.get("/chips/:userID", async (req, res) => {
	try {
		const results = await Wallet.findOne({ userID: req.params.userID });
		res.send(results);
	} catch (error) {
		res.send(error);
	}
});
//initialize the database and the collection

//define google cloud function name
exports.api = functions.https.onRequest(main);
