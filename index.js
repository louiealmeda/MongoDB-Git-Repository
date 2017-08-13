var fs = require('fs');
var colors = require('colors');
const argv = require('yargs').argv;
var dump = require('./dump.js');
var restore = require('./restore.js');
var mods = {};

mods.v = {
  description: 'get the current version of mongovc',
  call: function () {
	
	var p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
	
	console.log(p.version);
	
  }
};


mods.dump = {
  params: '<group name>',
  description: 'dump the database to the repository',
  call: dump
};

mods.restore = {
  params: '<group name>',
  description: 'restore a backup to the database',
  call: restore
};

var succeeded = false;
Object.keys(argv).forEach(function (e) {
  succeeded = succeeded || run(e, argv);
});

if (!succeeded) {
  console.log('available actions:'.blue);
  Object.keys(mods).forEach(function (e) {
	var mod = mods[e];
	console.log('mongovc --' + e + (' ' + (mod.params || '')) + (' //' + mod.description).gray);
  })
}

function run(name, argv) {
  
  if (!mods[name]) {
	return false;
  }
  
  mods[name].call(argv);
  return true;
  
}

