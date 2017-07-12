'use strict';

var fs = require('fs');
var _ = require('underscore');

var spawn = require( 'child_process' ).spawnSync;

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

config.host = config.host || 'localhost';
config.port= config.port || '27017';


_.each(config.collections, function (collection) {

    dump(collection);

});

function dump(collection){

    var query = spawn( 'mongo', [config.database, '--eval', "printjson( db."+collection+".find().sort({_id: 1}).toArray() )"] );

    var result = query.stdout.toString();
    result = result.replace(/^([\s\S]+?)\[/, '[');
    var filename = './collections/' + collection + ".json";

    fs.writeFile(filename, result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(new Date(), collection + " done");
    });

}

