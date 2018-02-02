const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
// load bcrypt
const bCrypt = require('bcrypt-nodejs');

const env        = require('dotenv').load();
// Models
const models = require("../../models/index");
const User=models.user;

let jwtOptions = {}
//console.log(ExtractJwt.fromAuthHeader());
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
//console.log(jwtOptions.jwtFromRequest());
console.log("JWT_SECRET: " + process.env.JWT_SECRET);
jwtOptions.secretOrKey = process.env.JWT_SECRET;

exports.strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:

    //let User = models.user;
    let user = User.findOne({where: {id: jwt_payload.id}}).then(function (user) {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

