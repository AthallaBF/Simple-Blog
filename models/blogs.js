// import dependencies and make make Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema to structur our datase
const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		snippet: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);

// export blog
module.exports = blog;
