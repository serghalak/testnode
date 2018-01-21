const express    = require('express');
const app        = express();
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const env        = require('dotenv').load();
const exphbs     = require('express-handlebars');

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//console.log('1');
app.get('/', function(req, res){
    res.send('Welcome to Passport with Sequelize');
});
//console.log('2');
// Models
const models = require("./models/index");
//console.log('3');
// Routes
const authRoute = require('./routes/auth.js')(app,passport);
//console.log('4');
// load passport strategies
require('./config/passport/passport.js')(passport,models.user);
//console.log('5');
// Sync Database
models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')
}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});
//console.log('6');
app.listen(5000, function(err){
if (!err)
    console.log("Site is live"); else console.log(err)
});