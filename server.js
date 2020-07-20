var path = require('path');
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
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


require('./controllers/posts.js')(app);
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


app.get('/', (req, res) => {
  res.render('main');
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
