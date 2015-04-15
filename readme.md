mkdir express_params_example
cd express_params_example
git init
touch index.js # Creates our main application file
echo "node_modules" > .gitignore # Creates a .gitignore file so node modules won't be included in your git repo
npm init # To continue, just hit enter continually at each prompt
npm install
npm install --save ejs body-parser method-override
set up app.js 
	// Require the modules we're going to need:
	var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

	// Now instantiate our express app:
	var app = express();

mkdir views
cd views 
After changing into the views dir, type:
touch index.ejs
// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'))


sequelize model:create --name="Org" --attributes="username:string, passwordDigest:string, orgName:string, contactPerson:string, email:string"

db.Org.create({username: "lotusalliance", passwordDigest: "2a$10$vMPOIDYq9fQXG/AqEoHzeeVbE0hP9iLc0dBzmYiSjieu48LoaguwG", orgName:"LOTUS Alliance", contactPerson:"Arati", email:"asureddi@lotusalliance.org"})


sequelize model:create --name="Progress" --attributes="maleUSCitizen:integer, maleForeignCitizen:integer, femaleUSCitizen:integer, femaleForeignCitizen:integer, maleDebtLaborBond:integer, maleForcedLabor:integer, maleSexTrafficked:integer, femaleDebtLaborBond:integer, femaleForcedLabor:integer, femaleSexTrafficked:integer, malesMultiple:integer, femalesMultiple:integer, newClients:integer, dropoutClients:integer, leftClients:integer, completedClients:integer"

install bcrypt and express-session

var username = "lotusalliance"
var password = "testdatabase"
passwordDigest = $2a$10$vMPOIDYq9fQXG/AqEoHzeeVbE0hP9iLc0dBzmYiSjieu48LoaguwG

var username = "testuser"
var password = "password"
passwordDigest = $2a$10$iebChv/qEkDo0.8/sh09QOuRvW641I9ea9AIgUfOixJlggmNHoK9C

db.Org.create({username: "testuser", passwordDigest: "2$2a$10$iebChv/qEkDo0.8/sh09QOuRvW641I9ea9AIgUfOixJlggmNHoK9C", orgName:"LA", contactPerson:"test", email:"test@lotusalliance.org"})

curl -i http://www.freedomcollaborative.org/api
HTTP/1.1 200 OK
Server: Cowboy
Connection: close
Date: Mon, 13 Apr 2015 21:19:17 GMT
Status: 200 OK
X-Frame-Options: SAMEORIGIN
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Ua-Compatible: chrome=1
X-Freedom-Registry-Media-Type: freedomregistry.v1
Content-Type: application/json; charset=utf-8
Etag: "45f5cc27a07bc302301fa774c725e3d1"
Cache-Control: max-age=0, private, must-revalidate
X-Request-Id: 53ffb56d-d590-410d-b2e0-9bd27b5d2a6e
X-Runtime: 0.372668
Via: 1.1 vegur

{"links":{"organizations":"http://www.freedomcollaborative.org/api/organizations{?accepts_volunteers,organization_type,good_practices,demographic,services,actions,religious_affiliation,state,city,name}"}}

//Code for pulling from freedom collaborative api
app.get('/something', function(req,res){
	var city = req.query.city.split(" ").join("+");

          //    "http://freedomcollaborative.org/api/organizations?city=san+francisco"
	var url = "http://freedomcollaborative.org/api/organizations?city=san+francisco";
	console.log(url);
	if (city) {
		request(url, function(err,resp,body){
			console.log(resp);

			if (!err && resp.statusCode === 200) {
				var output = JSON.parse(body);
				res.render('someview', {things: output});
			}
		});
	} else {
		res.render('someview', {things: []});
	}
});

