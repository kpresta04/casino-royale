const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define Schema
const walletSchema = new Schema({
	userID: { type: String, unique: true },
	chips: { type: Number, unique: false },

	// local: {
	// 	email: { type: String, unique: true },
	// 	password: { type: String }
	// },
	// google: {
	// 	id: { type: String },
	// 	photos: []
	// },
	// firstName: { type: String },
	// lastName: { type: String }
});

// Create reference to User & export
const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
