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

    var content = fs.readFileSync('./collections/' + collection + ".json",'utf8');



    // console.log('mongo', config.database, '--eval', "db."+collection+".remove(); db."+collection+".insert('"+content+"')" );

    var query = spawn( 'mongo', [config.database, '--eval', "db."+collection+".remove({});" + "db."+collection+".insertMany("+content+")"] );

    var result = query.stdout.toString();

    console.log(result);



}

