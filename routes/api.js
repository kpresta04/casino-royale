const express = require("express");
const router = express.Router();

router.get("/save", (req, res) => {
	res.send("hello");
});
