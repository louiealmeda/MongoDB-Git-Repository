'use strict';

var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

_.each(config.collections, function (collection) {

    dump(collection);

});

function dump(collection){

    var query = "printjson( db."+collection+".find().sort({_id: 1}).toArray() )";
    var result = db.execute(query);

    result = result.replace(/^([\s\S]+?)\[/, '[');
    var filename = './collections/' + collection + ".json";

    fs.writeFile(filename, result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(new Date(), collection + " done");
    });

}

