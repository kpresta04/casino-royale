/* Mongo Database
 * - this is where we set up our connection to the mongo database
 */
const mongoose = require("mongoose");
const mongoPW = require("./config");
mongoose.Promise = global.Promise;
const mongoDB = `mongodb+srv://dbUser1:${mongoPW}@cluster0-l36fj.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
	console.log(
		`You have successfully connected to your mongo database: ${mongoDB}`
	);
});
module.exports = db;
