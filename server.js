//secretkey and auth
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
//express init
var path = require('path');
const express = require('express')
const app = express()
app.use(cookieParser());// Add this after you initialize express.
// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

//controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);
//databse configuration
require('./db/config');


app.set('views', path.join(__dirname, 'views/layouts'));

app.engine( 'handlebars', exphbs( {
  extname: 'handlebars',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: false,
  partialsDir: __dirname + '/views/partials/'
}));
// Use handlebars to render
app.set('view engine', 'handlebars');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


app.get('/', (req, res) => {
  res.render('main');
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;
