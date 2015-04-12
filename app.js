// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

// Now instantiate our express app:
var app = express();

// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'))


var db = require("./models");

// Let's add some routes here together:
app.get('/', function (req, res) {
   res.render("index"); // We use res.render to display an EJS file instead of res.send() 
});


app.get('/articles', function(req,res) {
	// Find all the Atricles
	db.Article.all() // then I render the article index template
	  .then(function(batman){ // With articlesList as dbArticles
	  	res.render('articles/index', {articlesList: batman});
	  })
  console.log("GET /articles");
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

app.post('/articles', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
});

app.get('/articles/:id', function(req, res) {
	var id = req.params.id;
	db.Article.find(id)
	  .then(function(dbArticle){
	  	res.render('articles/article', {batman: dbArticle});
	  });  
});

app.get('/articles/:id/edit', function(req,res){
	var id = req.params.id;

	db.Article.find(id)
	  .then(function(dbArticle){
	  	res.render('articles/edit',{article: dbArticle});
	  });
});

app.put('/articles/:id', function(req,res){
	// Grab URL PARAM ID
	var id = req.params.id;

	// Grab the body of the request
	var formArticle = req.body.article;

	// Find the article with that id
	db.Article.find(id)
	  .then(function(dbArticle){
	  	// Update the article
	  	dbArticle.updateAttributes(formArticle)
	  	  .then(function(newArticle){
	  	  	// Redirect to articles show page
	  	  	res.redirect('/articles/'+newArticle.id);
	  	  });
	  });
});

// Creating delete action
app.delete('/articles/:id', function(req,res){
	// Grabbing the id from the URL Param ID
	var id = req.params.id;

	// Find the article with the id in the url
	db.Article.find(id)
	  .then(function(dbArticle){
	  	// Delete the article 
	  	dbArticle.destroy()
	  	  .then(function(){
	  	  	// Send us articles home
	  	  	res.redirect('/articles');
	  	  });
	  });
});

app.get('/', function(req,res) {
  res.render('index.ejs');
});

app.get('/about', function(req,res) {
  res.render('about.ejs');
});

app.get('/partners', function(req,res) {
  res.render('partners.ejs');
});


app.get('/contact', function(req,res) {
  res.render('contact.ejs');
});


// Start the server on port 3000
app.listen(3000);