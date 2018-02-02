const AppError =require('../services/AppError').appError;
//const AuthService =require('../services/AuthService');
const AuthValidationSchema =require('../config/validationSchemas').AuthValidationSchema;

// Models
const models = require("../models/index");
const User=models.user;

const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');
const _ = require('lodash');

const ajv = new Ajv();


exports = module.exports = {}


exports.signin = function(req,res){
    let body = req.body;
    let valid = ajv.validate(AuthValidationSchema.signIn, body);
    if (!valid) res.status(401).json({message: "user or password are not valid"});;
    let {email, password} = body;
    email = _.toLower(email);
    console.log(email);
    // database call:
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            //return done(null, false, { message: 'Email does not exist' });
            res.status(401).json({message: "no such user found"});
        }
        //console.log("user: " + user.email);
        if(bCrypt.compareSync(password, user.password)){
            const payload = {id: user.id};
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            let resultUser = user.toJSON();
            delete resultUser['password'];
            resultUser['token'] = token;
            res.json(resultUser);
        } else {
            res.status(401).json({message: "passwords did not match"});
        }
    });
}


exports.logout = function(req,res){
    console.log('logout>>>>>>>>>>>>>>'+req.body);
    res.status(200).send({ Authorization: false, token: null });
    // req.session.destroy(function(err) {
    // res.redirect('/');
  //});
}

// router.get('/logout', function(req, res) {
//     res.status(200).send({ Authorization: false, token: null });
// });