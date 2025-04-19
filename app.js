var { faker } = require('@faker-js/faker');
var mysql = require('mysql2');
var express = require('express');
var bodyParser= require("body-parser");

/*
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}
 
var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

connection.end();
*/

var app= express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'pass',
  database: 'join_us'
});

app.get("/", function(req, res){
  var q = 'SELECT COUNT(*) as count FROM users';
  connection.query(q, function (error, results) {
  if (error) throw error;
  var count= results[0].count;
  res.render("home", {data: count})
  });
 });

app.post("/register", function(req, res){
  var person= {
    email: req.body.email
  }

  connection.query('INSERT INTO users SET ?', person, function(err, result){
    if(err) throw err;
    res.redirect("/");
  })
  
});

app.listen(8080, function(){
  console.log("Connection success!");
});