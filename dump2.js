var fs = require('fs');
var _ = require('underscore');

process.env.TZ = 'UTC';

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

config.host = config.host || 'localhost';
config.port= config.port || '27017';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

ObjectId.prototype.toJSON= function(){

    return 'ObjectId("' + this + '")';
};

Date.prototype.toJSON= function(){

    return 'ISODate("' + this.toISOString() + '")';
};

// console.log(Date.prototype.toString);

// Connection URL
var url = 'mongodb://'+config.host+':'+config.port+'/' + config.database;
// Use connect method to connect to the Server passing in
// additional options

MongoClient.connect(url, {
    poolSize: 10
}, function(err, db) {

    function done() {
        db.close();
    }

    var pending = 0;

    _.each(config.collections, function(collection){

        pending++;

        var start = new Date();
        db.collection(collection).find({}, {sort: {_id: 1}}).toArray(function(error, data){

            if(error !== null)
                console.log(error);

            writeDump(collection, data);

            pending--;

            if(pending === 0)
                done();

        });

    });


});

function writeDump(collection, data){

    var ret = JSON.stringify(data, null, '\t');
    var regexString =  String.raw`"(ObjectId|ISODate)\(\\"(.*)\\"\)"`;

    var regex = new RegExp(regexString, 'mg');

    if(!ret){
        console.error(collection + ' failed to dump');
        return;
    }


    ret = ret.replace(regex, '$1("$2")');

    fs.writeFile('./collections/' + collection + ".json", ret, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(new Date(), collection + " done");
    });

}