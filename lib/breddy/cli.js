'use strict';
var argv = require('minimist')(process.argv.slice(2));
var breddy = require('../breddy');

var help = [
	'usage: breddy [actions] [options]',
	'',
	'actions:',
	'server:	start teh breddy server',
	'init: connect to breddy server',
	'pause: pause teh server',
	'resume: resume server after pause',
	'run [args]: runs a file in your current directory',
	'exec [args]: execs a command'	
];

var start = function(){
	switch(argv._[0]){
		case('server'):
			server();
			break;
		case('init'):
			init();
			break;
		case('send'):
			send();
			break;
		case('run'):
			run();
			break;
		case('exec'):
			exec();
			break;	
		case('pause'):
			pause();
			break;
		case('resume'):
			resume();
			break;
		default:
			showHelp();
	}
};

var server = function(){
	if(!((typeof argv.port) === 'undefined' || (typeof argv.port) === 'number')){
		throw new Error('Port must be a valid number between 1 and 65535');
	}
	breddy.server({
		port: argv.port 
	});
};

var init = function(){
	if(! argv._[1]){
		throw new Error('You must specifiy a server IP or URL');
	}
	breddy.init({
		server: argv._[1]
	}, function(){
		console.log('Dope Errything werked');
	});
};

var send = function(){
	if(! argv._[1]){
		throw new Error('You must specify a file name to send');
	}
	breddy.send(argv._[1]);
};

var run = function(){
	breddy.run();
};

var exec = function(){
	if(! argv._[1]){
		throw new Error('You must specify a shell command to run');
	}
	breddy.exec(argv._.slice(1));
};

var pause = function(){
	breddy.pause();
};

var resume = function(){
	breddy.resume();
};

var showHelp = function(){
	console.log(help.join('\n'));
};

module.exports = start;
