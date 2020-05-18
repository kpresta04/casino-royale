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
const mongoose = require("mongoose");

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server

const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));

const mongoPW = require("./db/config");
mongoose.Promise = global.Promise;
const mongoDB = `mongodb+srv://dbUser1:${mongoPW}@cluster0-l36fj.mongodb.net/test?retryWrites=true&w=majority`;

// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
// const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
// 	console.log(
// 		`You have successfully connected to your mongo database: ${mongoDB}`
// 	);
// });

main.get("/hello", (req, res) => res.send("hello dawg"));

main.get("/chips/:userID", async (req, res) => {
	try {
		await mongoose.connect(mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const results = await Wallet.findOne({ userID: req.params.userID });
		res.send(results);
	} catch (error) {
		res.send(error);
	}
});
//initialize the database and the collection

//define google cloud function name
exports.api = functions.https.onRequest(main);
