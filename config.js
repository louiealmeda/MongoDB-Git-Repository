var fs = require('fs');
var config = false;
var configPath = 'mongovc.config.json';
var colors = require('colors');
var _ = require('lodash');

module.exports = {
  path: configPath,
  devPath: 'dev.' + configPath,
  dumpPath: process.cwd() + '/collections/',
  get: function (supressWarning) {
  
	if (fs.existsSync(configPath)){
	  
	  var mainConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
	  var devConfig = {};
	  
	  if (fs.existsSync(module.exports.devPath))
		devConfig = JSON.parse(fs.readFileSync(module.exports.devPath, 'utf8'));
	  
	  var ret = _.merge(mainConfig, devConfig);

  	  ret.mongoPath = ret.mongoPath || '';

	  return ret;
	}
	else
	{
	  if (supressWarning)
	    return;
	  
	  console.log('No mongovc.config.js found in this folder, run '.red + 'mongovc --init'.green + ' to initialize this folder as a mongovc project'.red);
	  
	  return false;
	}
  
  },
  defaults: {
	"database": "YourDatabase",
	"collections": ["collectionName"],
	"groups": {
	  "all": [],
	  "structure": [],
	  "generated": ["collectionName"]
	}
  },
  devDefaults: {
	"database": "YourDatabase",
	"host": "localhost",
	"port": "27017",
	"collections": ["collectionName"],
	"groups": {
	  "yourGroupName": ["collectionName"]
	}
  }
  
};
