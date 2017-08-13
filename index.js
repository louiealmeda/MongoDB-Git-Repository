var fs = require('fs');
var colors = require('colors');
const argv = require('yargs').argv;
var config = require('./config');
var init = require('./init');
var mods = {};

mods.v = {
  description: 'get the current version of mongovc',
  call: function () {
	
	var p = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
	
	console.log(p.version);
	
  }
};

mods.help = {
  call: function () {
	console.log('available actions:'.blue);
	Object.keys(mods).forEach(function (e) {
	  var mod = mods[e];
	  console.log('mongovc --' + e + (' ' + (mod.params || '')) + (' //' + (mod.description || '') ).gray);
	});
  }
  
};

mods.init = {
  description: 'initializes the folder as a mongovc project',
  call: init
};

mods.dump = {
  params: '<group name>',
  description: 'dump the database to the repository',
  call: function (args) {
    require('./dump.js')(args);
  }
};

mods.restore = {
  params: '<group name>',
  description: 'restore a backup to the database',
  call: function (args) {
	require('./restore.js')(args);
  }
};



var succeeded = false;
Object.keys(argv).forEach(function (e) {
  succeeded = succeeded || run(e, argv);
});

if (!succeeded) {
  mods.help.call();
}

function run(name, argv) {
  
  if (!mods[name]) {
	return false;
  }
  
  mods[name].call(argv);
  return true;
  
}

