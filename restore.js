'use strict';

var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');
var groups = require('./groupManager');


_.each(groups.get(), function (collection) {

    dump(collection);

});

function dump(collection){

    var content = fs.readFileSync('./collections/' + collection + ".js",'utf8');

    var result = db.execute("db."+collection+".remove({});" + "db."+collection+".insertMany("+content+")");

    console.log(new Date() + ': Restored ' + collection);

}

