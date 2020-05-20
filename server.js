// Loading evnironmental variables here

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const Wallet = require("./db/models/wallet");

// const cors = require("cors");
const db = require("./db"); // loads our connection to the mongo database
const app = express();
const PORT = process.env.PORT || 8080;
const publicPath = path.join(__dirname, "..", "public");
// ===== Middleware ====
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }));
// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
// if (process.env.NODE_ENV === "production") {
// 	const path = require("path");
// 	console.log("YOU ARE IN THE PRODUCTION ENV");
// app.use("/static", express.static(path.join(__dirname, "../build/static")));
// }
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
/* Express app ROUTING */
// app.use("/api", require("./routes/api"));
// app.use(express.static(publicPath));
// app.get("/save", (req, res) => {
// 	res.send("hello");
// });
app.post("/chips", (req, res) => {
	const obj = req.body;
	console.log(obj);
	const newWallet = new Wallet(obj);
	newWallet.save((err, savedWallet) => {
		if (err) return res.json(err);
		return res.json(savedWallet);
	});
});

app.put("/chips/:userID", async (req, res) => {
	try {
		const { chips } = req.body;
		const results = await Wallet.findOneAndUpdate(
			{ userID: req.params.userID },
			{ chips }
		);
		res.send(results);
	} catch (error) {
		res.send(error);
	}
});
app.get("/chips/:userID", async (req, res) => {
	try {
		const results = await Wallet.findOne({ userID: req.params.userID });
		res.send(results);
	} catch (error) {
		res.send(error);
	}
});
app.get("*", (req, res) => {
	//
	// res.sendFile(path.join(publicPath, "index.html"));
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(publicPath, "index.html"));
// });
// ====== Error handler ====
// app.use(function (err, req, res, next) {
// 	console.log("====== ERROR =======");
// 	console.error(err.stack);
// 	res.status(500);
// });

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});
