'use strict';
var colors = require('colors');
var fs = require('fs');
var _ = require('lodash');
var db = require('./connection');
var groups = require('./groupManager');
var config = require('./config');
var chunkManager = require('./chunkManager');


function restoreCollections(argv) {
  
  var collections = groups.get(argv.restore);
  
  if (!collections)
    return;
  
  db = db.connect();
  
  console.log('Restoring...'.cyan);
  _.each(collections, function (collection) {

    restore(collection);

  });

}


function restore(collection){

  	collection = collection.name || collection;
  	var file = config.dumpPath + collection + ".js";
  
  	if(!fs.existsSync(file)){
  	  console.log(new Date().toString().gray + (' Skipped restoring ' + collection + '. collection not found').red);
  	  return;
	}
  	
    var content = fs.readFileSync(file,'utf8');
  	var chunks = 0;
  	db.execute("db."+collection+".remove({});");
  	
  		chunkManager.getChunks(content, function (chunk) {
  		
  		var result = db.execute("db."+collection+".insertMany("+chunk+")");
  		chunks++;
	}, 100000);
  	

    console.log(new Date().toString().gray + (' Restored ' + collection).cyan + (' chunks: ' + chunks).gray);

}

module.exports = restoreCollections;