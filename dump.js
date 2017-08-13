'use strict';
var colors = require('colors');

var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');
var groups = require('./groupManager');

function dumpCollections(argv) {

  console.log('Dumping...'.blue);
  _.each(groups.get(argv.dump), function (collection) {

    dump(collection);

  });

}

function dump(collection){

    var query = "printjson( db."+collection+".find().sort({_id: 1}).toArray() )";
    var result = db.execute(query);

    var filename = './collections/' + collection + ".js";

    fs.writeFile(filename, result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(new Date().toString().gray + (' Dumped ' + collection).green);
    });

}


module.exports = dumpCollections;
