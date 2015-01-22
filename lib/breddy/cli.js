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

var cli = {};

var start = function(){
	switch(argv._[0]){
		case('server'):
			cli.server();
			break;
		case('init'):
			cli.init();
			break;
		case('send'):
			cli.send();
			break;
		case('run'):
			cli.run();
			break;
		case('exec'):
			cli.exec();
			break;	
		case('pause'):
			cli.pause();
			break;
		case('resume'):
			cli.resume();
			break;
		default:
			cli.showHelp();
	}
};

console.log(argv);

cli.server = function(){
	if(!((typeof argv.port) === 'undefined' || (typeof argv.port) === 'number')){
		throw new Error('Port must be a valid number between 1 and 65535');
	}
	breddy.server({
		port: argv.port 
	});
};

cli.init = function(){
	if(! argv._[2]){
		throw new Error('You must specifiy a server IP or URL');
	}
	breddy.init({
		server: argv._[2]
	});
};

cli.send = function(){
	breddy.send();
};

cli.run = function(){
	breddy.run();
};

cli.exec = function(){
	breddy.exec();
};

cli.pause = function(){
	breddy.pause();
};

cli.resume = function(){
	breddy.resume();
};

cli.showHelp = function(){
	console.log(help.join('\n'));
};

module.exports = start;
