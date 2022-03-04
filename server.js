// import dependencies
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
// ----------------------------- create express app
const app = express();
const PORT = 3000;

// ------------------------------ connect to mongodb and mongoose
const mongoDBURL =
	"mongodb://athallabf:fidocakep@cluster0-shard-00-00.h5vj5.mongodb.net:27017,cluster0-shard-00-01.h5vj5.mongodb.net:27017,cluster0-shard-00-02.h5vj5.mongodb.net:27017/simple-blog-website?ssl=true&replicaSet=atlas-upownf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoDBURL).then(() => {
	console.log("connected to mongoDB");
	app.listen(PORT, () => {
		// listen to request after database is jconnected
		console.log("server is running on localhost:3000");
	});
});

// --------------------------- connect form submit
app.use(express.urlencoded({ extender: true }));

// ------------------------------ set up view engine
app.set("view engine", "ejs");

// ------------------------------ set up a GET method

app.post("/blogs", (req, res) => {
	const blog = new Blog(req.body);
	blog
		.save()
		.then(() => {
			res.redirect("/blogs");
		})
		.catch((err) => {
			console.log(err);
		});
});

// render create as a response
app.get("/blogs/new-blog", (req, res) => {
	res.render("create", { title: "New Blog" });
});

// render about as a response
app.get("/blogs/about", (req, res) => {
	res.render("about", { title: "About" });
});

// render detail as a response and set up an express id
app.get("/blogs/:id", (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render("details", { blog: result, title: "Blog Details" });
		})
		.catch((err) => console.log(err));
});

// accept a delete request and process it
app.delete("/blogs/:id", (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			// misalkan kita nerima request dari javascript (AJAX request) kita gak bisa ngeredirect
			res.json({ redirect: "/blogs" });
			// jadi disini dia akan ngirim json object sebagai response lalu akan dikirim ke front end ke bagian .then di fetch api
		})
		.catch((err) => console.log(err));
});

// render index as a response
app.get("/blogs", (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", { blogs: result, title: "Home" });
		});
});

// redirect root to homepage
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

// render 404 page
app.use((req, res) => {
	res.status(404).render("404", { title: "Error" });
});

// ------------------------------
