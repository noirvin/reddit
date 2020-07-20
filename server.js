var path = require('path');
const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
// require handlebars
const exphbs = require('express-handlebars');

// Use "main" as our default layout
app.set('views', path.join(__dirname, 'views/layouts'));
// Use "main" as our default layout
app.engine( 'handlebars', exphbs( {
  extname: 'handlebars',
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
