const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
        isAdmin: req.body.isAdmin,
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			res.status(401).json("Wrong username");
		} else {
			const hashedPassword = CryptoJS.AES.decrypt(
				user.password,
				process.env.PASS_SEC
			);
			const oPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
			if (oPassword !== req.body.password) {
				res.status(401).json("Wrong password");
			} else {
				const { password, ...other } = user._doc;
				const accessToken = jwt.sign(
					{
						id: user._id,
						isAdmin: user.isAdmin,
					},
					process.env.JWT_SEC,
					{ expiresIn: "3d" }
				);
				res.status(200).json({ ...other, accessToken });
			}
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
