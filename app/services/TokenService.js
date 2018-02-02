// import * as rp from "request-promise";
const config = require( '../config/app');
// //import {Token} from '../models/Token';
const _  = require('lodash');
// import logger from './logger';
const AppError = require('./AppError');
//const jwt =require('jsonwebtoken');
// import * as uuid from "node-uuid";


const generateToken = function (email, type) {
    return jwt.sign({email, type}, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
};


const parseToken = async function(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.jwt.secret, function(err, decoded) {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
};

export default {
    generateToken,
    parseToken,
};