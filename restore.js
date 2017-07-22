'use strict';

var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


_.each(config.collections, function (collection) {

    dump(collection);

});

function dump(collection){

    var content = fs.readFileSync('./collections/' + collection + ".json",'utf8');

    var result = db.execute("db."+collection+".remove({});" + "db."+collection+".insertMany("+content+")");

    console.log(result);

}

