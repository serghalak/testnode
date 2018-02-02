const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
// load bcrypt
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const app = express();
// Models
const models = require("./models/index");
const User=models.user;

const authController=require('./controllers/authController');

app.use(passport.initialize());

// load passport strategies
const strategy = require('./config/passport/passport.js').strategy;
passport.use(strategy);

// parse application/x-www-form-urlencoded
//for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json())


app.get("/", function(req, res) {
    res.json({messge: "Express is up!"});
});

app.post('/login', authController.signin);


app.get("/secret", passport.authenticate("jwt", { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
    function(req, res, next){
        console.log(req.get('Authorization'));
        next();
    }, function(req, res){
        res.json("debugging");
    });


// Sync Database
models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')
}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});

app.listen(3000, function(err) {
    if(!err){
        console.log("Express running");
    }else{
        console.log(err);
    }
});