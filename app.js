const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homestartingcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const aboutcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const contactcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const heading = "Home";
const heading2 = "About";
const heading3 = "Contact";
const compose = "compose";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
	res.render("home", {heading: heading,homestartingcontent:homestartingcontent, posts: posts });

});
app.get("/about", function(req, res){
	res.render("about", {heading2: heading2,aboutcontent: aboutcontent });
});
app.get("/contact", function(req, res){
	res.render("contact", {heading3: heading3,contactcontent: contactcontent });
});

app.get("/compose", function(req, res){
	res.render("compose", {compose:compose,})
});



app.post("/compose", function(req, res){
	const post = {
		title: req.body.title,
		content: req.body.message
	}
   posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postname", function(req, res){

const newtitle = _.lowerCase(req.params.postname);

posts.forEach(function(post){
	const storedtitle = _.lowerCase(post.title);

	if (newtitle === storedtitle) {
		res.render("post", {title: post.title, content:post.content});
	}
});

});
	




app.listen(3000, function(){
	console.log("server is up and running.");
})