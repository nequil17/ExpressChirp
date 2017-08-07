var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var ids = require('shortid');

var jsonPath = path.join(__dirname, 'data.json');

var app = express();
app.use(bodyParser.json());

app.route('/chirps')
.get(function(req, res) {
    fs.readFile(jsonPath, function(err, file) {
        if (err) {
            res.writeHead(500);
            res.end('Could not read file');
        }
            res.write(file);
            res.end();
    })

}) .post(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            } else {
                var arr = JSON.parse(file),
                data = req.body;
                data.id = ids.generate();
                arr.push(data);
        fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
            if (err) {
                res.writeHead(500);
                res.end('Couldn\'t successfully store data');
                } else {
                res.writeHead(201, 'Created');
                res.end(JSON.stringify(arr));
                }
            })
        } 
    });

});

app.route('/chirps/one/:id')
.delete(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }
        var arr = JSON.parse(file);
        var result;
        var id = req.params.id;
        var chirp = req.body;

        arr.forEach(function(chirp, i) {
            if (chirp.id === id) {
                deleteIndex = i;
            }
        });
        if (deleteIndex != -1) {
            arr.splice(deleteIndex, 1);
        }
      
        fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
            if (err) {
                res.status(500);
            } else {
                res.send(JSON.stringify(arr));
               }
           });   
        });
   })

// app.get('chirps/:id', function(req, res) {

// });


app.listen(3000);