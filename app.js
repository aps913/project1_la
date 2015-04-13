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

// this tells us we will need a `views/login` file
app.get("/login", function (req, res) {
  res.render("login");
});

// this where the form goes
app.post("/login", function (req, res) {
    var user = req.body.user;
    
    db.Org.
    authenticate(user.email, user.password).
    then(function (user) {
        req.login(user);
        res.redirect("/organization");
    });
})

app.get("/organization", function (req, res) {
  req.currentUser()
    .then(function (user) {
      res.render("/organization", {user: user});
    })
});

app.get('/organization', function(req,res) {
	// First page of data input where organizations input/ update their company admin data into the "Org" table
	db.Article.all() // then I render the article index template
	  .then(function(batman){ // With articlesList as dbArticles
	  	res.render('articles/index', {articlesList: batman});
	  })
  console.log("GET /articles");
});

app.post('/organization', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
});

app.get('/demographics', function(req,res) {
	// First page of data input where organizations input/ update their company admin data into the "Org" table
	db.Article.all() // then I render the article index template
	  .then(function(batman){ // With articlesList as dbArticles
	  	res.render('articles/index', {articlesList: batman});
	  })
  console.log("Loaded demographics");
});

app.post('/demographics', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
});

app.get('/progress', function(req,res) {
	// First page of data input where organizations input/ update their company admin data into the "Org" table
	db.Article.all() // then I render the article index template
	  .then(function(batman){ // With articlesList as dbArticles
	  	res.render('articles/index', {articlesList: batman});
	  })
  console.log("GET /articles");
});

app.post('/progress', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
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