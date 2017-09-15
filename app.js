var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOver = require("method-override");
var expSan = require("express-sanitizer");
var mongoose = require("mongoose");
// // var bootstrap = require('bootstrap');



//App Config
mongoose.connect("mongodb://node_blog:pass@ds139124.mlab.com:39124/node_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expSan());
app.use(methodOver("_method"));

//Mongoose/model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test Title Blog",
// 	image: "https://scontent.flos3-1.fna.fbcdn.net/v/t1.0-1/p160x160/20767815_1577821268935675_1650698914966330585_n.jpg?_nc_eui2=v1%3AAeFu6tl94dolWmOLddc6bBX126ntjmrFBRbMOSPLhqaJkNJBzr-GZotQhnAazP5DSbdqRcsHm5ZFO24epDfeBByUmYftqfsBHjGkanAfOQ47Gw&oh=20c5bb7fe50a75b4bc2f88cc9e6781e8&oe=5A37CF0D",
// 	body: "Type Blog Post Here"
// });

//ROUTES

app.get("/", function(req, res){
	res.redirect("/blog");
});

//INDEX ROUTE
app.get("/blog", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!!");
		} else{
			res.render("index", {blogs:blogs});
		}
	});
	
});

//NEW ROUTE
app.get("/blog/new", function(req, res){
	res.render("new");
});
//CREATE ROUTE
app.post("/blog", function(req,res){
	
	//create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blog");
		}
	});
});

//SHOW ROUTE'
app.get("/blog/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blog");
		} else{
			res.render("show",{blog: foundBlog});
		}
	});
});

//EDIT ROUTE
app.get("/blog/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blog");
		} else{		
			res.render("edit", {blog: foundBlog});
		}
	});
})

//UPDATE ROUTE
app.put("/blog/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blog");
		} else {
			res.redirect("/blog/" + req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete("/blog/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blog");
		} else {
			res.redirect("/blog");
		}
	});
});


app.listen(4000, function () {
  console.log('Our Site is on Port 4000');
});