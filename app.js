// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override")
    session = require("express-session");

// Now instantiate our express app:
var app = express();

// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'))

var db = require("./models");

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
}))

app.use("/", function (req, res, next) {
	req.login = function (user) {
    req.session.userId = user.id;
  };

  req.currentUser = function () {
    return db.User.
      find({
        where: {
          id: req.session.userId
       }
      }).
      then(function (user) {
        req.user = user;
        return user;
      })
  };

  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }

  next(); 
});


app.get('/', function (req, res) {
   res.render("index"); 
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
    var user = req.body.org.username;
    var pass = req.body.org.password;
    console.log("REQ.body", req.body);
    
    db.Org.
    authenticate(user, pass).
    then(function (dbUser) {
        req.login(dbUser);
        res.redirect("/organization");
    });
})

// app.get("/organization", function (req, res) {
//   req.currentUser()
//     .then(function (user) {
//       res.render("/organization", {username: username});
//     })
// });

app.get('/organization', function(req,res) {
	res.render("organization");
});
	// First page of data input where organizations input/ update their company admin data into the "Org" table
	// db.Article.all() // then I render the article index template
	//   .then(function(batman){ // With articlesList as dbArticles
	//   	res.render('articles/index', {articlesList: batman});
	//   })
//   console.log("GET /articles");
// });

app.post('/organization', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
});

app.get('/demographics', function(req,res) {
	  res.render("demographics");
});
// 	// First page of data input where organizations input/ update their company admin data into the "Org" table
// 	db.Article.all() // then I render the article index template
// 	  .then(function(batman){ // With articlesList as dbArticles
// 	  	res.render('articles/index', {articlesList: batman});
// 	  })
//   console.log("Loaded demographics");
// });

app.post('/demographics', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
});

app.get('/progress', function(req,res) {
	res.render("progress");
});
	// First page of data input where organizations input/ update their company admin data into the "Org" table
// 	db.Article.all() // then I render the article index template
// 	  .then(function(batman){ // With articlesList as dbArticles
// 	  	res.render('articles/index', {articlesList: batman});
// 	  })
//   console.log("GET /articles");
// });

app.post('/progress', function(req,res) {
	var article = req.body.article;
	db.Article.create(article)
	  .then(function(dbArticle){
	  	res.redirect('/articles');
	  })
  console.log(req.body);
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