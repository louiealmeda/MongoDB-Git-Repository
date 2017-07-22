var fs = require('fs');
var spawn = require( 'child_process' ).spawnSync;

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

config.host = config.host || 'localhost';
config.port= config.port || '270171';

module.exports = {

  execute: function (query) {

    var run = spawn( 'mongo', [config.database, '--eval', query] );
    var ret = run.stdout.toString();

    var original = ret;
    ret = ret.replace(/^([\s\S]+?)\[/, '[');

    if (ret.indexOf('[thread1] Failed to connect to ') === 0){
      console.warn('Cannot connect to database');
      throw original;
    }

    return ret;
  }

};