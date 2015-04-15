// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    request = require('request');
	
var app = express();

var db = require("./models");

app.set('view engine', 'ejs');

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
}));

app.use("/", function (req, res, next) {
	req.login = function (user) {
    req.session.userId = user.id;
  };

  req.currentUser = function () {
    return db.Org.
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

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.render("index"); 
});

app.get("/login", function (req, res) {
		req.currentUser().then(function(user){
			console.log("Hello from login");
			console.log(user);
		if (user) {
			res.redirect('/demographics');
		} else {
			res.render("login");
		}
	});
});

app.post("/login", function (req, res) {
    var user = req.body.org.username;
    var pass = req.body.org.password;
    db.Org.
    authenticate(user, pass).
    then(function (dbUser) {
        req.login(dbUser);
        res.render("demographics");
    });
});

// app.get('/demographics', function(req,res) {
// 	console.log("hello from demographics")
// 	console.log(req.user);

// 	if (req.user !== false) {
// 			res.render("demographics");
// 		} else {
// 			res.redirect("login");
// 		}
// });


// app.post('/organization', function(req,res) {
// 	var  = req.body.org;
// 	db.Progress.create()
// 	  .then(function(dbProgress){
// 	  	res.redirect('/');
// 	  })
//   console.log(req.body);
// });
//made /demographics inaccessible from public route.
// app.get('/demographics', function(req,res) {
// 	  res.render("demographics");
// });

app.post('/demographics', function(req,res) {
	//pulls from form that is tied to progress table named on demographics.ejs
	var demo = req.body.progress;
	//code taken from annie regarding posting data to a user
	//progress.orgId = req.session.orgId;
	// create a new progress based on info stored in demo variable
	db.Progress.create(demo)
		// then in a new function, render the progress.ejs page and make the newly created instance of progress (dbProgress) available on the progress.ejs page through a variable named progress (first argument)
	  .then(function(dbProgress){
	  	res.render('progress', {progress: dbProgress});
	  })
  console.log(req.body);
});

// app.get('/progress', function(req,res) {
// 	res.render("progress");
// });

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
	// PUT API CALL HERE!!!!
  res.render('about.ejs');
});

app.get('/partners', function(req,res) {
  res.render('partners.ejs');
});


app.get('/contact', function(req,res) {
  res.render('contact.ejs');
});


// app.get('/sync', function(req, res) {
// 	db.sequelize.sync( { force: true } ).then(function(){
// 		res.send("DB synced successfully.");
// 	})
// })

var server = app.listen(process.env.PORT || 3000)
    // This part just adds a snazzy listening message:
    // console.log(new Array(51).join("*"));
    // console.log("\t LISTENING ON: \n\t\t localhost:3000");
    // console.log(new Array(51).join("*")); 
// });
