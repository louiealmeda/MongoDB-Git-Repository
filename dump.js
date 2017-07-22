'use strict';

var fs = require('fs');
var _ = require('underscore');
var db = require('./connection');
var groups = require('./groupManager');

_.each(groups.get(), function (collection) {

    dump(collection);

});

function dump(collection){

    var query = "printjson( db."+collection+".find().sort({_id: 1}).toArray() )";
    var result = db.execute(query);

    var filename = './collections/' + collection + ".js";

    fs.writeFile(filename, result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("dumped " + collection + " at " + new Date());
    });

}

