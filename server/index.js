#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var path = require('path');
var PythonShell = require('python-shell');
var TMClient = require('textmagic-rest-client');
var c = new TMClient('williamli1', '1Duphcf3PFygaW7cTmV1x02T7rh9kQ');

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/foo', function(req, res){
    res.send('requested foo');
});

app.get('/not_a_search', function(req, res){

  

c.Messages.send({text: 'test message', phones:'5713266568'}, function(err, res){
    console.log('Messages.send()', err, res);
    
});
res.send('sent');

});


app.get('/piglatin', function(req, res){
    console.log(req);
    var file = __dirname + '/uploads/'+req.query.g; 

    var options = {
        mode: 'text',
        args: [file],
        scriptPath: "/web/projects/HackTJ2018/public/HackTJ2018/server/"
    };

    PythonShell.run("latin.py", options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.send(results);
    }); 
    
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
