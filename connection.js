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
	  
		var run = spawn( 'mongo', [config.database, '--eval', query] );
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

