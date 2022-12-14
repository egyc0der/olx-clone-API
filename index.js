const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adsRoute = require("./routes/ads");

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB Connection Successfull!"))
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.json());
//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/ads", adsRoute);


app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running!");
});
