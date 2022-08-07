const mongoose = require("mongoose");

const AddSchema = new mongoose.Schema(
	{
		Title: { type: String, unique: true },
		userId: { type: String},
		mainImage: { type: String},
		price: { type: String},
		otherImages: {
			type: Array,
	
		},
		desc: { type: String},
		details: { type: Object},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Add", AddSchema);
