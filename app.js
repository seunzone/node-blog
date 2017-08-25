var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// // var bootstrap = require('bootstrap');



//App Config
mongoose.connect("mongodb://localhost/node_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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


app.get("/blog", function(req,res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR!!");
		} else{
			res.render("index", {blogs:blogs});
		}
	});
	
});

app.listen(3000, function () {
  console.log('Our Site is on Port 3000');
});