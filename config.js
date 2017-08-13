var fs = require('fs');
var config = false;
var configPath = 'mongovc.config.json';
var colors = require('colors');

module.exports = {
  path: configPath,
  dumpPath: process.cwd() + '/collections/',
  get: function (supressWarning) {
  
	if (fs.existsSync(configPath)){
	  var ret = JSON.parse(fs.readFileSync(configPath, 'utf8'));
	  
	  return ret;
	}
	else
	{
	  if (supressWarning)
	    return;
	  
	  console.log('No mongovc.config.js found in this folder, run '.red + 'mongovc --init'.green + ' to initialize this folder as a mongovc project'.red);
	}
  
  },
  defaults: {
	"database": "YourDatabase",
	"collections": ["YourCollection"],
	"groups": {
	  "all": [],
	  "structure": [],
	  "generated": ["YourCollection"]
	}
  }
  
};
