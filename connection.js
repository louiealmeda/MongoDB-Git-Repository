var fs = require('fs');
var spawn = require( 'child_process' ).spawnSync;
var colors = require('colors');

var config = require('./config').get();

module.exports = {
  
  connect: function(){
  
	config.host = config.host || 'localhost';
	config.port= config.port || '27017';
 
	config.mongoPath = config.mongoPath.replace(/\/(mongod)?(\.exe)?\/?$/,'/');
	
	var path = config.mongoPath + 'mongo';
	console.log('running', path);
	console.log('database:'.gray, config.database);
	console.log('    host:'.gray, config.host);
	console.log('    port:'.gray, config.port);
	return {
	  execute: function (query) {
	  
		var run = spawn( path, [config.database, '--host', config.host, '--port', config.port, '--eval', query] );

		if(!run.stdout){
			console.warn("Cannot see mongod.exe, try adding `mongoPath` in your dev.config which should contains the directory to your mongod executable");
			process.exit();
		}

		var ret = run.stdout.toString();
	 
		var original = ret;
		ret = ret.replace(/^([\s\S]+?)\[/, '[');
	 
		if (ret.indexOf('[thread1] Failed to connect to ') === 0){
		  console.warn('Cannot connect to database'.red);
		  console.log(original);
		  process.exit();
		}
	 
		return ret;
	  }
	
	}
  
  }
  
};

