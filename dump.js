'use strict';
var colors = require('colors');

var fs = require('fs');
var _ = require('lodash');
var db = require('./connection');
var groups = require('./groupManager');
var config = require('./config');

function dumpCollections(argv) {

  var collections = groups.get(argv.dump);
  
  if (!collections)
    return;
  
  db = db.connect();

  console.log('Dumping...'.cyan);
  _.each(collections, function (collection) {

    dump(collection);

  });

}

function dump(collection){

  	var filter = collection.filter || "{}";
  	collection = collection.name || collection;
  	var sort = collection.filter || "{_id: 1}";
  	
    var query = "printjson( db."+collection+".find("+filter+").sort("+sort+").toArray() )";
    var result = db.execute(query);
	
    var filename = config.dumpPath + collection + ".js";
  
	if (!fs.existsSync(config.dumpPath)){
	  fs.mkdirSync(config.dumpPath);
	}
    
    fs.writeFile(filename, result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(new Date().toString().gray + (' Dumped ' + collection).green);
    });

}


module.exports = dumpCollections;
