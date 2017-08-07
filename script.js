var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

app.route('/api/chirps')
.get(function(req, res) {
    console.log("inside get request");

}) .post(function(req, res) {

}) .delete(function(req, res) {

});


app.listen(3000);