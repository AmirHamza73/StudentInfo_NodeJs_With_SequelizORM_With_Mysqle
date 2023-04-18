'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const dbConfig = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const db = {};

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    });

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// 
// sequelize.sync({ alter: true }).then((data) => {
//   console.log("add new colume");
// }).catch((err) => {
//   console.log("error do not add new colume");
// })
//drop table and re - create table
// sequelize.sync({
//   force: true
// }).then((data) => {
//   console.log("add new colume");
// }).catch((err) => {
//   console.log("error do not add new colume");
// })

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db; 
