const expressLib = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mySql = require('mysql');
const PORT = 8080;
const express = expressLib();

/* Server's libraries */
const loginServer = require('./Controller/login.js');
const indexServer = require('./Controller/index.js');

express.set('view engine', 'ejs'); //Default view engine EJS
express.set('views', path.join(__dirname, '/views')); //Redefine the view's director
express.use('/public', expressLib.static('public'));
express.use(bodyParser.urlencoded({extended: true}));


const connection = mySql.createConnection({
    "host": "yourhostname",
    "user": "your datebase name",
    "password": "your password",
    "database": "database name"
});

connection.connect(function(error){
    if(error){
        console.log('Error in Database connection!');
        console.log(error);
    }else{
        console.log('Connection success!');
    }
});

loginServer(express, connection);
indexServer(express, connection);


express.listen(PORT, function(error){
    if(error){
        console.log('Error in server starting');
    }else{
        console.log('Server starting on port: ' + PORT);
    }
}); //Listening on port 8080