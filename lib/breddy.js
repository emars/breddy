var request = require('request');
var express = require('express');
var mkdirp = require('mkdirp');
var multer = require('multer');
var HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

var cp = require('child_process');
var fs = require('fs');

var breddy = module.exports;

breddy.server = function(opts){
	'use strict';
	opts.port = opts.port || 3000;
	console.log('server',opts.port);

	mkdirp.sync('./assets');

	var app = express();

	app.use(express.static(process.cwd()+'/assets')); 

	app.use(multer({ dest: './assets',
		rename: function(fieldname, filename){
			return filename;
		}}));

	app.get('/', function(req, res){
		console.log('ping');
		res.send('pong');
	});

	app.post('/', function(req, res){
		console.log(req.body);
		var command = req.body.command;
		switch(command){
			case('run'):
				run(req, function(err, data){
					res.send(data);
				});
				break;
			case('exec'):
				exec(req, function(err, data){
					res.send(data);
				});
				break;
			case('send'):
				send(req, function(err, data){
					res.send('data');
				});
				break;
			default:
				res.send(400);
		}
	});

	app.listen(opts.port, function(){
		console.log('Listening on port',opts.port);
	});
};

breddy.init = function(opts, cb){
	'use strict';
	request.get(opts.server, function(err, res, body){
		if(err){
			throw new Error(err);
		}
		mkdirp.sync(HOME+'/.breddy');
		var config = {
			server: opts.server
		};
		fs.writeFileSync(HOME+'/.breddy/config.json',JSON.stringify(config));
		cb(null);
	});
};

var getConfig = function(cb){
	fs.readFile(HOME+'/.breddy/config.json', function(err, file){
		cb(null, JSON.parse(file));
	});
};

var run = function(req, cb){
};

var exec = function(req, cb){

};

var send = function(req, cb){
	console.log(req.files);
};

breddy.send = function(filename){
	getConfig(function(err, config){
		var server = config.server;
		var file = fs.readFileSync(process.cwd()+'/'+filename);
		var req = request.post(server, function(err, res, body){
			console.log('it shoulda werked dawg');
		});
		var form = req.form();
		form.append('file', fs.createReadStream(filename));
	});
}