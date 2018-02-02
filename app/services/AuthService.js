const AppError =require('./AppError');
//const models = require('../models');
//const bcryptjs = require('bcryptjs');
// load bcrypt
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
//import { error } from 'util';
//import UserService from './UserService';

// import UserService from './UserService';
const TokenService =require('./TokenService');
// import config from '../../config';
// Models
const models = require("../models/index");
const User=models.user;
// const signUp = async function (params) {
//     let user = await models.User.findOne(
//         { where: { email: params.email } });
//
//     if (user) throw new AppError(400, 'Email already exists');
//
//     await UserService.create(params);
//     console.log("{{{{{{{{{{{{{signUp");
//     let result = {email: params.email};
//
//     console.log(">>>>RESULT>>>>>>" + result);
//     return result;
//
// };
exports = module.exports = {};

exports.signIn = function (params) {

    let email=params.email;
    let password=params.password;
    console.log("email: " + email + " password: " + password);
    // if (req.body.email && req.body.password) {
    //     email = req.body.email;
    //     password = req.body.password;
    //     console.log("email: " + email + " password: " + password);
    // }
    // usually this would be a database call:
    User.findOne({where: {email: email}}).then(function (user) {
        if (!user) {
            //return done(null, false, { message: 'Email does not exist' });
            res.status(401).json({message: "no such user found"});
        }
    console.log("user: " + user.email);
        if(bCrypt.compareSync(password, user.password)){
            const payload = {id: user.id};
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            console.log("token: " + token);
            //return({message: "ok", token: token});


            let resultUser = user.toJSON();
            delete resultUser['password'];
            resultUser['token'] = token;
            //result['refreshToken'] = refreshToken.value;

            return resultUser;

        } else {
            console.log("none token: ");
            //return({message: "passwords did not match"});
            return 2;
            //next(null, false);
        }
    });





    // let user = await models.User.findOne(
    //     { where: { email: params.email } });
    //
    // if (!user) throw new AppError(404, 'User with given email not found');
    //
    // //bcryptjs
    //
    // let result=await bcryptjs.compare(params.password,user.password);
    // if(!result)  throw new AppError(400, 'Password is wronge');
    // //return user with token "jwt"
    //
    // //let passwordMatch = user.comparePassword(params.password);
    // // if (!passwordMatch) throw new AppError(400, 'Password incorrect');
    //
    // // if (!user.active) throw new AppError(400, `Your account isn't activated`);
    //
    // let signInToken = TokenService.generateToken(user.email, 'signin');
    //
    // // let refreshToken = await TokenService.generateRefreshToken({userId: user._id, email: user.email, type: 'refresh'});
    //
    // let resultUser = user.toJSON();
    // delete resultUser['password'];
    //
    // resultUser['signInToken'] = signInToken;
    // // result['refreshToken'] = refreshToken.value;
    //
     //return resultUser;
    // //return "from AuthService";
};



// export default {
//     signIn
// };