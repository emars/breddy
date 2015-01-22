var fs = require('fs');
var request = require('request');
var express = require('express');
var cp = require('child_process');

var breddy = module.exports;

breddy.server = function(opts){
	opts.port = opts.port || 3000;
	console.log('server',opts.port);
	var app = express();

	app.get('/', function(req, res){
		console.log('ping');
		res.send('pong');
	});

	app.post('/', function(req, res){
		var command = req.body.command;
		switch(command){
			case('run'):
				var file = req.
				run(file);
				break;
		}
	});

	app.listen(port, function(){
		console.log('Listening on port',opts.port);
	});
};

breddy.init = function(opts, cb){
	request.get(opts.server, function(err, res, body){
		if(err){
			throw new Error(err);
		}
	});
}

var run = function(){

}