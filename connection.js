var fs = require('fs');
var spawn = require( 'child_process' ).spawnSync;

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

config.host = config.host || 'localhost';
config.port= config.port || '27017';

module.exports = {

  execute: function (query) {

    var run = spawn( 'mongo', [config.database, '--eval', query] );
    return run.stdout.toString();

  }

};