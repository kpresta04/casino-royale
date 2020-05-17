// Loading evnironmental variables here
if (process.env.NODE_ENV !== "production") {
	console.log("loading dev environments");
	require("dotenv").config();
}
require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db"); // loads our connection to the mongo database
const app = express();
const PORT = process.env.PORT || 8080;
const publicPath = path.join(__dirname, "..", "public");
// ===== Middleware ====
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
	app.use(express.static("./client/build"));
}
/* Express app ROUTING */
// app.use("/api", require("./routes/api"));
// app.use(express.static(publicPath));
app.get("/save", (req, res) => {
	res.send("hello");
});

app.get("*", (req, res) => {
	// res.sendFile(path.join(publicPath, "index.html"));
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
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
