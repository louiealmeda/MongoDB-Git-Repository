'use strict';
var colors = require('colors');
var fs = require('fs');
var _ = require('lodash');
var db = require('./connection');
var groups = require('./groupManager');
var config = require('./config');

function restoreCollections(argv) {
  
  var collections = groups.get(argv.restore);
  
  if (!collections)
    return;
  
  db = db.connect();
  
  console.log('Restoring...'.blue);
  _.each(collections, function (collection) {

    restore(collection);

  });

}


function restore(collection){

  	var file = config.dumpPath + collection + ".js";
  
  	if(!fs.existsSync(file)){
  	  console.log(new Date().toString().gray + (' Skipped restoring ' + collection + '. collection not found').red);
  	  return;
	}
  	
    var content = fs.readFileSync(file,'utf8');

    var result = db.execute("db."+collection+".remove({});" + "db."+collection+".insertMany("+content+")");

    console.log(new Date().toString().gray + (' Restored ' + collection).cyan);

}

module.exports = restoreCollections;