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
	req.session.orgId = req.session.orgId || null;
	
	req.login = function (org) {
		console.log(org);
		console.log("from app24");
    	req.session.orgId = org.id;
  	};

  req.currentOrg = function () {
    return db.Org.
      find({
        where: {
          id: req.session.orgId
       }
      })
      .then(function (org) {
        req.org = org;
        return org;
      })
  };

  req.logout = function () {
    req.session.orgId = null;
    req.org = null;
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
	if(req.session.orgId){
		res.redirect('/demographics');
	}else {
		res.render("login");
	}
});
// 		console.log("fromapp60");
// 		console.log(req.currentOrg);
// 		req.currentOrg().then(function(org){
// 			console.log("Hello from login");
// 			console.log(org);
// 		if (org) {
// 			res.redirect('/demographics');
// 		} else {
// 			res.render("login");
// 		}
// 	});
// });

app.post("/login", function (req, res) {
    var username = req.body.org.username;
    console.log("username:" + username)
    var password = req.body.org.password;
    console.log("pw:" + password);
    db.Org.
    authenticate(username,password)
	.then(function (dbOrg) {
        if (dbOrg){
        	req.login(dbOrg);
        res.render("demographics");
    }else{
    	res.redirect('/login');
    }
    });
});


app.get("/organization", function(req, res) {
	db.Org.find(req.session.orgId)
		.then(function(dbOrg) {
			res.render("organization", { org: dbOrg })
		})
})

//update database using sequelize
app.put("/organization/:id", function(req, res) {
	var orgId = req.params.id;

	var org = req.body.org;
	// Finish this later
	res.send("This is the org ID that was passed through:", orgId);

})
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

app.get("/demographics", function(req, res) {
	db.Org.find(req.session.orgId)
		.then(function(dbOrg) {
			res.render("demographics", { org: dbOrg })
		})
})

app.post('/demographics', function(req,res) {
	//pulls from form that is tied to progress table named on demographics.ejs
	var demo = req.body.progress;
	console.log(req.session.orgId)
	demo.orgId = req.session.orgId;
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

