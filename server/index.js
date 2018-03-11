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
//var $ = require("jQuery");

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

app.get('/not_a_search', function(req, res){
    // c.Messages.send({text: 'test message', phones:'5713266568'}, function(err, res){
    //     console.log('Messages.send()', err, res);
    // });
    var options = {
        mode: 'text',
        scriptPath: "/web/projects/HackTJ2018/public/HackTJ2018/server/"
    };
    
    PythonShell.run("wikipedia.py", options, function(err, results){
       if (err){
            console.log(err)
       }
       res.send('sent');
       console.log('results: %j', results);
    });

});


app.get('/testreq', function(req, res) {
    console.log(req.body);
    
    request.get(
        'http://hacktj2018.sites.tjhsst.edu/email?n=5713266568&c=txt.att.net&s=kys&m=fjhksdf',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                res.send("done");
            }
        }
    );
    //DO THE METHOD HERE
    
    
    
    /*getRoutes(function(err, data){ 
        if(err) return res.send(err);       
        res.sendStatus(data);
    });*/

});



app.post('/getCall', function(req, res) {
    console.log(req.body);
    
    // request.get(
    //     '/email?n=5713266568&c=txt.att.net&s=kys&m=fjhksdf',
    //     function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body)
    //         }
    //     }
    // );
    //DO THE METHOD HERE
    
    request.get(
        'http://hacktj2018.sites.tjhsst.edu/email?n=5715334077&c=txt.att.net&s=kys&m=fjhksdf',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.sendStatus(200);
            }
        }
    );
    
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
