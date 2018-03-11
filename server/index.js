#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express');
var app = express();
var path = require('path');
var PythonShell = require('python-shell');
var TMClient = require('textmagic-rest-client');
var c = new TMClient('williamli1', '1Duphcf3PFygaW7cTmV1x02T7rh9kQ');
var nodemailer = require('nodemailer');
var wikiSearcher = require('./js/searchWiki.js');
var $ = require("jquery");
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer();
//var JSON = require("JSON")

var request = require('request');
var http = require('http');

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/wikiQuery', function(req, res){
    var searchQuery = req.query.q;
    var output = wikiSearcher.search(searchQuery, data2 => res.send(data2));
});

app.get('/email', function(req, res){
    //var recipient= "5713266568@txt.att.net"
    //var recipient= "7bobperson7@gmail.com"
    var recipient=req.query.n+"@"+req.query.c;
    var youremail='swaggyzhou69@gmail.com'
    var yourpass="Rockyrun2015"

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: youremail,
        pass: yourpass
      }
    });
    
    var mailOptions = {
      from: youremail,
      to: recipient,
      subject: req.query.s,
      text: req.query.m
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          res.send(req+error+recipient)
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send("sent"+recipient)
      }
    });
});

app.get('/foo', function(req, res){
    var file = req.query.g; 

    var options = {
        mode: 'text',
        args: [file],
        scriptPath: "/web/projects/HackTJ2018/public/HackTJ2018/server/"
    };
    
    PythonShell.run("wikisearch.py", options, function(err, results){
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.send(results);
    });
});

app.get('/testreq', function(req, res) {
    // $.get("wikiQuery", {q: req.query.q}, function(data){
    //     res.send(data)
    // });
    var urlForSite = "http://hacktj2018.sites.tjhsst.edu/wikiQuery?q=" + req.query.q;
    request.get(urlForSite, function(error, response, body){
        var urlForSite2 = "http://hacktj2018.sites.tjhsst.edu/email?n=5715944683&c=tmomail.net&s=" + req.query.q + "&m=" + body;
        request.get(
            urlForSite2,
            function (error2, response2, body2) {
                res.send(body2);
            }
        );
    });
    //DO THE METHOD HERE
    
    
    
    /*getRoutes(function(err, data){ 
        if(err) return res.send(err);       
        res.sendStatus(data);
    });*/

});



app.post('/getCall', upload.array(), function(req, res, next) {
    
    // request.get(
    //     '/email?n=5713266568&c=txt.att.net&s=kys&m=fjhksdf',
    //     function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body)
    //         }
    //     }
    // );
    //DO THE METHOD HERE
    
    //request.get("http://hacktj2018.sites.tjhsst.edu/wikiQuery?q=" + req.body.text, function(error, response, body){
        var carrier = "gmail.com";
        var number = "whapplez";
        var subject = "hello";
        
        console.log("===============================")
        console.log("Getting REQ")
        console.log(req.body)
        console.log("===============================")
        
        var urlForSite = 'http://hacktj2018.sites.tjhsst.edu/email?n=' + number + "&c=" + carrier + "&s=" + subject + "&m=" + req;
        request.get(
            urlForSite,
            function (error2, response2, body2) {
                if (!error2 && response2.statusCode == 200) {
                    console.log(body2);
                    res.sendStatus(200);
                }
            }
        );
    //});
    
    /*getRoutes(function(err, data){ 
        if(err) return res.send(err);       
        res.sendStatus(data);
    });*/

});

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
