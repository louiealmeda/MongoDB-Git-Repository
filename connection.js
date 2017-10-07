var fs = require('fs');
var spawn = require( 'child_process' ).spawnSync;
var colors = require('colors');

var config = require('./config').get();

module.exports = {
  
  connect: function(){
  
	config.host = config.host || 'localhost';
	config.port= config.port || '27017';
 
	return {
	  execute: function (query) {
	  
	  	var path = config.mongoPath + 'mongo';
	  	console.log('running', path);
		var run = spawn( path, [config.database, '--eval', query] );

		if(!run.stdout){
			console.warn("Cannot see mongo.exe, try adding `mongoPath` in your dev.config which contains the directory to your mongo executable");
			process.exit();
		}

		var ret = run.stdout.toString();
	 
		var original = ret;
		ret = ret.replace(/^([\s\S]+?)\[/, '[');
	 
		if (ret.indexOf('[thread1] Failed to connect to ') === 0){
		  console.warn('Cannot connect to database'.red);
		  throw original;
		}
	 
		return ret;
	  }
	
	}
  
  }
  
};

