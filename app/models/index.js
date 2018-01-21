"use strict";
const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const env       = process.env.NODE_ENV || "development";
const config    = require(path.join(__dirname, '..','..',  'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db        = {};
let model;
//console.log('models->index');
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
      model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
//console.log('models->index1');
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

//console.log('models->index2');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//console.log('models->index3');
module.exports = db;
