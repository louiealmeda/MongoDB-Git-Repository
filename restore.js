'use strict';
var colors = require('colors');
var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');
var groups = require('./groupManager');
const argv = require('yargs').argv;

console.log('Restoring...'.blue);
_.each(groups.get(argv.group), function (collection) {

    dump(collection);

});

function dump(collection){

    var content = fs.readFileSync('./collections/' + collection + ".js",'utf8');

    var result = db.execute("db."+collection+".remove({});" + "db."+collection+".insertMany("+content+")");

    console.log(new Date().toString().gray + (' Restored ' + collection).cyan);

}

